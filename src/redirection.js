import storage from "./util/storage";
import { participantResource } from "./util/constants";
import firebase from "./util/firebase";
import browser from "webextension-polyfill";
import timer from "./timer";
import { parseUrl, makeDate } from "./util/utilities";

async function createFilter() {
  const procList = await storage.list.get();
  const url = procList.map((item) => {
    return { hostContains: `${item.name}.` };
  });
  const filter = { url: url };
  return filter;
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

async function windowChangeListener(windowId) {
  if (windowId >= 0) {
    try {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0) {
        checkTab(tabs[0]);
      }
    } catch (error) {
      // console.log(error);
    }
  }
}

function addWindowChangeListener() {
  browser.windows.onFocusChanged.addListener(windowChangeListener);
}

function removeWindowChangeListener() {
  browser.windows.onFocusChanged.removeListener(windowChangeListener);
}

async function restartWindowChangeListener() {
  removeWindowChangeListener();
  addWindowChangeListener();
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
  if (details.frameId === 0 && !details.url.includes("auth")) {
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
        // console.log(error.message);
      }
    }
  }
}

function addOriginTabCloseListener() {
  browser.tabs.onRemoved.addListener(onOriginRemoved);
}

async function onOriginRemoved(details) {
  const origin = await storage.origin.get();
  if (origin) {
    if (details === origin.tabId) {
      storage.origin.remove();
      timer.stopBonusTime(); // Without this badge goes "Done". This is bad. Maybe I'll fix it later.
      timer.stopLearningSession(); // This is fine
    }
  }
}

async function handleRedirectionLoad() {
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
@description Gets currently active tab and sends message to the content script if it
is a procrastination website. */
async function checkActiveTab() {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tabs.length > 0) {
      const tab = tabs[0];
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
    // console.log(error.message);
  }
}

async function checkTabById({ tabId }) {
  try {
    const tab = await browser.tabs.get(tabId);
    checkTab(tab);
  } catch (error) {
    // console.log(error.message);
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
  await storage.stats[event]();
  await storage.shouldRedirect.set(false);
  const rewardTime = await storage.timeSettings.rewardTime.get();
  timer.startProcrastinationSession(checkActiveTab, rewardTime);
  const origin = await storage.origin.get();
  try {
    await browser.tabs.update(origin.tabId, { url: origin.url });
    addRedirectionLog(
      `Go to origin: ${event}`,
      participantResource.name,
      parseUrl(origin.url).name
    );
  } catch (error) {
    // console.log(error.message);
  } finally {
    storage.origin.remove();
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
      storage.stats.snooze();
      await storage.shouldRedirect.set(false);
      timer.startProcrastinationSession(checkActiveTab, 60000);
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
    // console.log(error.message);
  }
}

async function addRedirectionLog(event, from, to) {
  const user = await storage.uid.get();
  const timeSettings = await storage.timeSettings.getAll();
  firebase.addLog(
    {
      user: user,
      event: event,
      from: from,
      to: to,
      timeSettings: timeSettings,
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
  windowChangeListener: {
    start: addWindowChangeListener,
    stop: removeWindowChangeListener,
    restart: restartWindowChangeListener,
  },
  gotoOrigin,
  addOriginTabCloseListener,
};
