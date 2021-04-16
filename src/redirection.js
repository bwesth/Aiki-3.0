import storage from "./util/storage";
import { learningSites } from "./util/constants";
import browser from "webextension-polyfill";
import timer from "./timer";
import { parseUrl } from "./util/utilities";

async function createFilter() {
  const procList = await storage.getList();
  const url = procList.map((item) => {
    return { hostContains: `.${item.name}.` };
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

async function restartTabChangeListener() {
  removeTabChangeListener();
  addTabChangeListener();
}

async function redirect(details) {
  if (details.frameId === 0) {
    const toggled = await storage.getRedirectionToggled();
    const shouldRedirect = await storage.getShouldRedirect();
    console.log(
      "Redirection toggled?",
      toggled,
      "Shoud redirect?",
      shouldRedirect
    );
    if (toggled && shouldRedirect) {
      timer.startLearningSession();
      storage.setOrigin({ url: details.url, tabId: details.tabId });
      browser.tabs.update(details.tabId, {
        url: `https://${learningSites[0].host}`,
      });
    }
  }
}

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
  console.log(tab);
  checkTab(tab);
}

async function checkTab(tab) {
  console.log(tab);
  const tabSiteName = parseUrl(tab.url).name;
  const procList = await storage.getList();
  const procListNames = procList.map((site) => site.name);
  console.log(procListNames);
  console.log(procListNames.includes(tabSiteName));
  if (procListNames.includes(tabSiteName)) {
    console.log(tab);
    redirect({ frameId: 0, url: tab.url, tabId: tab.id });
  }
}

async function gotoOrigin() {
  await storage.setShouldRedirect(false);
  timer.startProcrastinationSession(checkCurrentTab);
  const origin = await storage.getOrigin();
  browser.tabs.update(origin.tabId, { url: origin.url });
  storage.removeOrigin();
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
