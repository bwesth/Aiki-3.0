import storage from "./util/storage";
import { learningSites, participantResource } from "./util/constants";
import browser from "webextension-polyfill";
import timer from "./timer";
import { parseUrl, makeDate, parseTime } from "./util/utilities";

// API-related imports
import API from "./API/index";
import { eventNames, reasonNames } from "./API/Event";

const l = console.log;

let shouldShowWelcome = true;
let targetSiteFocused = false;

async function addRedirectionTargetListener() {
  const url = learningSites.map((item) => {
    return { hostContains: `${item.name}.` };
  });
  const filter = { url: url };

  async function redirectionTargetListener(details) {
    API.event.create(eventNames.redirectionTargetVisited, details);
  }

  browser.webNavigation.onBeforeNavigate.addListener(
    redirectionTargetListener,
    filter
  );
}

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

function addOriginUpdatedListener() {
  browser.tabs.onUpdated.addListener(originUpdatedListener);
}

function removeOriginUpdatedListener() {
  browser.tabs.onUpdated.removeListener(originUpdatedListener);
}

async function originUpdatedListener(details) {
  const origin = await storage.origin.get();
  if (origin) {
    if (origin.tabId === details) {
      const tab = await browser.tabs.get(details);
      l(tab);
      if (tab.url.includes(participantResource.name)) {
        storage.learningUri.set(tab.url);
      }
    }
  }
}

/**
 * @async @function
 * @description Checks if redirection should happen,
 * then starts a learning session countdown,
 * stores the origin tab and url in storage,
 * then updates the tab with a pre-defined learning resourse url
 * @param {object} details
 * @param {string} details.url
 * @param {number} details.tabId */
async function redirect(details) {
  if (await checkActiveTime()) {
    if (details.frameId === 0 && !details.url.includes("auth")) {
      const toggled = await storage.redirection.get();
      const shouldRedirect = await storage.shouldRedirect.get();
      if (toggled && shouldRedirect) {
        // l("ShouldRedirect", shouldRedirect);
        const origin = await storage.origin.get();
        // l("Checking against this: ", origin);
        if (origin) {
          // l(details);
          addProcsiteLoadedListener();
        } else {
          timer.startLearningSession();
          const learningUri = await storage.learningUri.get();
          try {
            await browser.tabs.update(details.tabId, {
              url: learningUri,
            });

            storage.origin.set({ url: details.url, tabId: details.tabId });
            const eventDetails = {
              reason: reasonNames.redirected.instant,
              from: parseUrl(details.url).name,
              to: participantResource.name,
            };
            API.event.create(eventNames.redirected, eventDetails);
            addLearningSiteLoadedListener(details.tabId);
          } catch (error) {
            // console.log(error.message);
          }
          addOriginUpdatedListener(details.tabId);
        }
      }
    }
  }
}

async function checkActiveTime() {
  const fromTime = await storage.operatingHours.from.get();
  const toTime = await storage.operatingHours.to.get();
  const date = makeDate();
  if (date.hours < fromTime.hrs) {
    return false;
  } else if (date.hours === fromTime.hours && date.minutes < fromTime.minutes) {
    return false;
  }
  if (date.hours > toTime.hrs) {
    return false;
  } else if (date.hours === toTime.hrs && date.minutes > toTime.min) {
    return false;
  }
  return true;
}

function addOriginTabCloseListener() {
  browser.tabs.onRemoved.addListener(onOriginRemoved);
}

async function onOriginRemoved(details) {
  const origin = await storage.origin.get();
  if (origin) {
    if (details === origin.tabId) {
      // l("Origin killed");
      removeOriginUpdatedListener();
      removeAllContentBlockers();
      storage.origin.remove();
      timer.stopBonusTime(); // Without this badge goes "Done". This is bad. Maybe I'll fix it later.
      timer.stopLearningSession(); // This is fine
      storage.shouldRedirect.set(true);
    }
  }
}

async function addLearningSiteLoadedListener() {
  browser.webNavigation.onCompleted.addListener(messageLearningResource, {
    url: [{ hostContains: `.${participantResource.name}.` }],
  });
}

function removeLearningSiteLoadedListener() {
  l("Removing Leaning site loaded listener");
  browser.webNavigation.onCompleted.removeListener(messageLearningResource);
  shouldShowWelcome = true;
}

async function messageLearningResource(details) {
  try {
    const origin = await storage.origin.get();
    if (!origin || origin.tabId === details.tabId) {
      const response = await browser.tabs.sendMessage(details.tabId, {
        action: "display: encouragement",
        countdown: timer.getTime().learningTimeRemaining,
        shouldShowWelcome: shouldShowWelcome,
      });
      shouldShowWelcome = false;
      if ((await response.action) === "continue") {
        // storage.learningUri.set(response.uri);
        gotoOrigin("continue", response.source);
        removeLearningSiteLoadedListener();
      } else if ((await response.action) === "end injection") {
        removeLearningSiteLoadedListener();
      }
    }
  } catch (error) {
    // console.log(error);
  }
}

/**
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
        const details = {
          triggerSite: tabSiteName,
          redirectingTo: participantResource.name,
        };
        API.event.create(eventNames.redirectWarningTriggered, details);
        const learningUri = await storage.learningUri.get();
        talkToContent(tab.id, learningUri, tab.url);
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

/**
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
  const origin = await storage.origin.get();
  checkIfTargetSiteFocusChange(origin, tab);
  if (procListNames.includes(tabSiteName)) {
    if (origin) {
      const eventDetails = {
        blockedSite: tabSiteName,
        origin: origin,
      };
      API.event.create(eventNames.siteBlockerTriggered, eventDetails);
      renderContentBlocker({ tabId: tab.id, frameId: 0 });
    } else {
      redirect({ frameId: 0, url: tab.url, tabId: tab.id });
    }
  }
}

async function checkIfTargetSiteFocusChange(origin, tab) {
  if (origin) {
    const eventDetails = {
      origin: origin,
      focusedTab: tab,
    };
    if (targetSiteFocused && origin.tabId !== tab.id) {
      API.event.create(eventNames.targetSiteUnfocused, eventDetails);
    } else if (!targetSiteFocused && origin.tabId === tab.id) {
      API.event.create(eventNames.targetSiteFocused, eventDetails);
    }
  }
}

/**
 * @async
 * @function
 * @description Changes location of the tab registered as the tab
 * that triggered a redirection from procrastination to learning site.
 * The uri was saved upon redirection, and here restored in full in the same tab.
 * Origin is an object of type: {integer: tabId, string: url} */
async function gotoOrigin(reason, source) {
  await storage.stats[reason]();
  const origin = await storage.origin.get();
  removeOriginUpdatedListener();
  try {
    const learningTab = await browser.tabs.get(origin.tabId);
    storage.learningUri.set(learningTab.url);
  } catch (error) {
    l(error);
  }
  await storage.shouldRedirect.set(false);
  storage.origin.remove();
  try {
    await browser.tabs.update(origin.tabId, { url: origin.url });
    removeAllContentBlockers();
    const details = {
      reason: reasonNames.gotoOrigin[reason],
      source: source,
      from: participantResource.name,
      to: parseUrl(origin.url).name,
    };
    API.event.create(eventNames.gotoOrigin, details);
  } catch (error) {
    l(error);
  }

  const redirectionToggled = await storage.redirection.get();
  if (redirectionToggled) {
    const rewardTime = parseTime.toSystem(
      await storage.timeSettings.rewardTime.get()
    );
    timer.startProcrastinationSession(checkActiveTab, rewardTime);
  }
}

async function talkToContent(tabId, url, originUrl) {
  try {
    const result = await browser.tabs.sendMessage(tabId, {
      action: "display: snooze",
      url: url,
    });
    if (result.action === "snooze") {
      const details = {
        from: parseUrl(originUrl).name,
        to: participantResource.name,
      };
      API.event.create(eventNames.redirectWarningSnoozed, details);
      storage.stats.snooze();
      await storage.shouldRedirect.set(false);
      timer.startProcrastinationSession(checkActiveTab, 60000);
    } else {
      addLearningSiteLoadedListener();
      const eventDetails = {
        reason: reasonNames.redirected.autoResolved,
        from: parseUrl(originUrl).name,
        to: participantResource.name,
      };
      API.event.create(eventNames.redirected, eventDetails);
      timer.startLearningSession();
      storage.origin.set({ url: originUrl, tabId: tabId });
      addOriginUpdatedListener(tabId);
    }
  } catch (error) {
    // console.log(error.message);
  }
}

function renderContentBlocker(details) {
  if (details.frameId === 0) {
    removeProcsiteLoadedListener();
    storage.blockedTabs.add(details.tabId);
    try {
      // l("Sending block request to content");
      browser.tabs.sendMessage(details.tabId, {
        action: "inject blocker",
      });
    } catch (error) {
      // l(error);
    }
  }
}

function removeContentBlocker(tabId) {
  // l("Removing blocker on tab ", tabId);
  try {
    browser.tabs.sendMessage(tabId, { action: "remove blocker" });
  } catch (error) {
    l(error);
  }
}

async function removeAllContentBlockers() {
  const blockedTabs = await storage.blockedTabs.get();
  // l("Blocked tabs: ", blockedTabs);
  blockedTabs.forEach((tabId) => {
    removeContentBlocker(tabId);
  });
  storage.blockedTabs.clear();
}

async function addProcsiteLoadedListener() {
  // l("Adding listener");
  const filter = await createFilter();
  // l(filter);
  browser.webNavigation.onCompleted.addListener(renderContentBlocker, filter);
}

async function removeProcsiteLoadedListener() {
  // l("Removing listener");
  browser.webNavigation.onCompleted.removeListener(renderContentBlocker);
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
  removeLearningSiteLoadedListener,
  checkActiveTab,
  addMirceaListener: addRedirectionTargetListener,
};
