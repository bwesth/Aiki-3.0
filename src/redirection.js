import storage from "./util/storage";
import { learningSites } from "./util/constants";
import browser from "webextension-polyfill";
import timer from "./timer";

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

async function restartRedirectionListener() {
  await removeNavigationListener();
  addNavigationListener();
}

async function redirect(details) {
  if (details.frameId === 0) {
    const toggled = await storage.getRedirectionToggled();
    const shouldRedirect = await storage.getShouldRedirect();
    console.log(toggled, shouldRedirect);
    if (toggled && shouldRedirect) {
      timer.startLearningSession();
      storage.setOrigin({ url: details.url, tabId: details.tabId });
      browser.tabs.update(details.tabId, { url: `https://${learningSites[0].host}` });
    }
  }
}

async function gotoOrigin() {
  await storage.setShouldRedirect(false);
  timer.startProcrastinationSession();
  const origin = await storage.getOrigin();
  browser.tabs.update(origin.tabId, { url: origin.url });
  storage.removeOrigin();
}

export default {
  addNavigationListener,
  removeNavigationListener,
  restartRedirectionListener,
  gotoOrigin,
};
