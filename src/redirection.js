import storage from "./util/storage";
import { participantResource } from "./util/constants";
import firebase from "./util/firebase";
import browser from "webextension-polyfill";
import timer from "./timer";
import { parseUrl, makeDate } from "./util/utilities";

async function createFilter() {
  const procList = await storage.list.get();
  const url = procList.map((item) => {
    return { hostContains: `.${item.name}.` };
  });
  const filter = { url: url };
  return filter;
}

/**
 * @deprecated Use addNavigationListener */
async function addConditionalNavigationListener() {
  const filter = await createFilter();
  const warningState = await storage.warningOption.get();
  if (warningState) {
    console.log(warningState, "Adding an onCompleted listener");
    browser.webNavigation.onCompleted.addListener(redirect, filter);
  } else {
    console.log(warningState, "Adding an onBeforeNavigate listener");
    browser.webNavigation.onBeforeNavigate.addListener(redirect, filter);
  }
}

async function addNavigationListener() {
  const filter = await createFilter();
  browser.webNavigation.onBeforeNavigate.addListener(redirect, filter);
}

async function removeNavigationListener() {
  const filter = await createFilter();
  browser.webNavigation.onBeforeNavigate.removeListener(redirect, filter);
}

async function restartNavigationListener() {
  await removeNavigationListener();
  addNavigationListener();
}

function addTabChangeListener() {
  browser.tabs.onActivated.addListener(checkTabById);
}

function removeTabChangeListener() {
  browser.tabs.onActivated.removeListener(checkTabById);
}

async function restartTabChangeListener() {
  removeTabChangeListener();
  addTabChangeListener();
}

/** #REDIRECT()#
 * @async @function
 * @description Checks if redirection should happen,
 * then starts a learning session countdown,
 * stores the origin tab and url in storage,
 * then updates the tab with a pre-defined learning resourse url
 * @param {object} details
 * @param {string} details.url
 * @param {number} details.tabId */
async function redirect(details) {
  console.log("Redirection details: ", details);
  if (details.frameId === 0) {
    const toggled = await storage.redirection.get();
    const shouldRedirect = await storage.shouldRedirect.get();
    if (toggled && shouldRedirect) {
      timer.startLearningSession();
      try {
        await browser.tabs.update(details.tabId, {
          url: `https://${participantResource.host}`,
        });
        storage.origin.set({ url: details.url, tabId: details.tabId });
        addRedirectionLog(
          `Interception: instant redirection`,
          parseUrl(details.url).name,
          participantResource.name
        );
        handleRedirectionLoad(details.tabId);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
}

async function handleRedirectionLoad(tabId) {
  browser.webNavigation.onCompleted.addListener(messageLearningResource, {
    url: [{ hostContains: `.${participantResource.name}.` }],
  });
}

async function messageLearningResource(details) {
  const response = await browser.tabs.sendMessage(details.tabId, {
    action: "display: encouragement",
  });
  browser.webNavigation.onCompleted.removeListener(messageLearningResource);
}

/** #CHECKCURRENTTAB()#
@function
@async
@description Gets currently active tab and calls checkTab on the resulting tab. */
async function checkActiveTab() {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tabs.length > 0) {
      const tab = tabs[0];
      console.log("Active tab: ", tab);
      const tabSiteName = parseUrl(tab.url).name;
      const procList = await storage.list.get();
      const procListNames = procList.map((site) => site.name);
      if (procListNames.includes(tabSiteName)) {
        addRedirectionLog(
          `Interception: initiating countdown`,
          tabSiteName,
          participantResource.name
        );
        talkToContent(tab.id, `https://${participantResource.host}`, tab.url);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function checkTabById({ tabId }) {
  try {
    const tab = await browser.tabs.get(tabId);
    checkTab(tab);
  } catch (error) {
    console.error(error.message);
  }
}
// TODO: Rewrite these two functions ^ & v to 1 single function that checks if tab has url (if not, get it)

/** #CHECKTAB()#
 * @async
 * @function
 * @description Checks a tab against a list of websites defined as procrastination websites.
 * If a tab's url is found in the list, it calls the redirect function using that tab's details.
 * @param {object} tab
 * @param {number} tab.frameId
 * @param {string} tab.url
 * @param {number} tab.id */
async function checkTab(tab) {
  const tabSiteName = parseUrl(tab.url).name;
  const procList = await storage.list.get();
  const procListNames = procList.map((site) => site.name);
  if (procListNames.includes(tabSiteName)) {
    redirect({ frameId: 0, url: tab.url, tabId: tab.id });
  }
}

/** #GOTOORIGIN()#
 * @async
 * @function
 * @description Changes location of the tab registered as the tab
 * that triggered a redirection from procrastination to learning site.
 * The uri was saved upon redirection, and here restored in full in the same tab.
 * Origin is an object of type: {integer: tabId, string: url} */
async function gotoOrigin(event) {
  await storage.shouldRedirect.set(false);
  const rewardTime = await storage.timeSettings.rewardTime.get();
  timer.startProcrastinationSession(checkActiveTab, rewardTime);
  const origin = await storage.origin.get();
  try {
    await browser.tabs.update(origin.tabId, { url: origin.url });
    storage.origin.remove();
    addRedirectionLog(
      `Go to origin: ${event}`,
      participantResource.name,
      parseUrl(origin.url).name
    );
  } catch (error) {
    console.error(error.message);
  }
}

async function talkToContent(tabId, url, originUrl) {
  try {
    const result = await browser.tabs.sendMessage(tabId, {
      action: "display: snooze",
      url: url,
    });
    if (result.snooze === true) {
      addRedirectionLog(
        `Interception: snoozed`,
        parseUrl(originUrl).name,
        participantResource.name
      );
      await storage.shouldRedirect.set(false);
      timer.startProcrastinationSession(checkActiveTab, 120000);
    } else {
      addRedirectionLog(
        `Interception: auto resolve`,
        parseUrl(originUrl).name,
        participantResource.name
      );
      timer.startLearningSession();
      storage.origin.set({ url: originUrl, tabId: tabId });
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function toggleWarning() {
  await storage.warningOption.set(false);
  restartNavigationListener();
}

async function addRedirectionLog(event, from, to) {
  const user = await storage.uid.get();
  const warningOption = await storage.warningOption.get();
  const timeSettings = await storage.timeSettings.getAll();
  const details = { warningOption: warningOption, timeSettings: timeSettings };
  firebase.addLog(
    {
      user: user,
      event: event,
      from: from,
      to: to,
      detail: details,
      date: makeDate(),
    },
    "redirection"
  );
}

export default {
  navigationListener: {
    start: addNavigationListener,
    stop: removeNavigationListener,
    restart: restartNavigationListener,
  },
  tabChangeListener: {
    start: addTabChangeListener,
    stop: removeTabChangeListener,
    restart: restartTabChangeListener,
  },
  gotoOrigin,
};
