import storage from "./util/storage";
import { learningSites } from "./util/constants";
import browser from "webextension-polyfill";

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

async function redirect(details) {
  if (details.frameId === 0) {
    const toggled = await storage.getRedirectionToggled();
    console.log("redirection:", toggled);
    if (toggled) {
      storage.setOrigin({ url: details.url, tabId: details.tabId });
      browser.tabs.update(details.tabId, { url: "https://www.codecademy.com" });
    }
  }
}

async function restartRedirectionListener() {
  await removeNavigationListener();
  addNavigationListener();
}

async function gotoOrigin() {
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
