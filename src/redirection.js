import storage from "./util/storage";
import { learningSites } from "./util/constants";
import browser from "webextension-polyfill";
import timer from "./timer";
import { parseUrl } from "./util/utilities";

async function createFilter() {
  const procList = await storage.list.get();
  const url = procList.map((item) => {
    return { hostContains: `.${item.name}.` };
  });
  const filter = { url: url };
  return filter;
}

async function addNavigationListener() {
  const filter = await createFilter();
  const warningState = await storage.warningOption.get()
  if (warningState) {
    console.log(warningState,"Adding an onCompleted listener")
    browser.webNavigation.onCompleted.addListener(redirect, filter);
  } else {
    console.log(warningState,"Adding an onBeforeNavigate listener")
    browser.webNavigation.onBeforeNavigate.addListener(redirect, filter);
  }
}

async function removeNavigationListener() {
  const filter = await createFilter();
  browser.webNavigation.onCompleted.removeListener(redirect, filter);
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

/**
@function
@async
@description Checks if redirection should happen, 
then starts a learning session countdown,
stores the origin tab and url in storage,
then updates the tab with a pre-defined learning resourse url
@param {object} details
@param {string} details.url
@param {number} details.tabId */
async function redirect(details) {
  if (details.frameId === 0) {
    const toggled = await storage.redirection.get();
    const shouldRedirect = await storage.shouldRedirect.get();
    if (toggled && shouldRedirect) {
      const warningState = await storage.warningOption.get();
      if (warningState) {
        talkToContent(details.tabId, `https://${learningSites[0].host}`, details.url);
      } else {
        timer.startLearningSession();
        storage.origin.set({ url: details.url, tabId: details.tabId });
        browser.tabs.update(details.tabId, {
            url: `https://${learningSites[0].host}`,
          });
        }
    }
  }
}

/**
@function
@async
@description Gets currently active tab and calls checkTab on the resulting tab. */
async function checkCurrentTab() {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (tabs.length > 0) {
    const tab = tabs[0];
    checkTab(tab);
  }
}

async function checkTabById({ tabId }) {
  const tab = await browser.tabs.get(tabId);
  checkTab(tab);
}
// TODO: Rewrite these two functions ^ & v to 1 single function that checks if tab has url (if not, get it)

/** 
@function
@async
@description Checks a tab against a list of websites defined as procrastination websites.
If a tab's url is found in the list, it calls the redirect function using that tab's details.
@param {object} tab
@param {number} tab.frameId
@param {string} tab.url
@param {number} tab.id */
async function checkTab(tab) {
  const tabSiteName = parseUrl(tab.url).name;
  const procList = await storage.list.get();
  const procListNames = procList.map((site) => site.name);
  if (procListNames.includes(tabSiteName)) {
    redirect({ frameId: 0, url: tab.url, tabId: tab.id });
  }
}

/**
@function
@async
@description Changes location of the tab registered as the tab 
that triggered a redirection from procrastination to learning site.
The uri was saved upon redirection, and here restored in full in the same tab.
Origin is an object of type: {integer: tabId, string: url} */
async function gotoOrigin() {
  await storage.shouldRedirect.set(false);
  timer.startProcrastinationSession(checkCurrentTab);
  const origin = await storage.origin.get();
  browser.tabs.update(origin.tabId, { url: origin.url });
  storage.origin.remove();
}

async function talkToContent(tabId, url, originUrl) {
  addMessageListener();
  console.log(tabId, url);
  const result = await browser.tabs.sendMessage(tabId, { action: "display: message", url: url });
  console.log(result)
  if (result.removeWarning === true) {
    toggleWarning()
  }
  timer.startLearningSession();
  storage.origin.set({ url: originUrl, tabId: tabId });
}

async function toggleWarning(){
  await storage.warningOption.set(false)
  restartNavigationListener()
}

function addMessageListener() {
  browser.runtime.onMessage.addListener((msg) => console.log(msg));
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
