import storage from "./util/storage";
import { learningSites } from "./util/constants";
import browser from "webextension-polyfill";

async function createFilter() {
  const procList = await storage.getList();
  console.log(procList);
  let url = procList.map((item) => {
    return { hostContains: `.${item.name}.` };
  });

  const filter = {
    url: url,
  };

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
      storage.setOriginUrl(details.url);
      console.log(details);
      browser.tabs.update(details.tabId, { url: "https://www.codecademy.com" });
    }
  }
}

export default { addNavigationListener, removeNavigationListener };
