import storage from "./util/storage";
import { learningSites } from "./util/constants";
import browser from "webextension-polyfill";

async function createFilter() {
  const procList = await storage.getList();

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

function redirect() {
  location.replace("www.codecademy.com");
}

export default { addNavigationListener, removeNavigationListener };
