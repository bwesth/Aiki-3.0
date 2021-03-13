import browser from "webextension-polyfill";
import listeners from "./eventListeners";
import storage from "./util/storage";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    alert("Hello");
    const urls = [
      // Default procrastination sites.
    ];
    storage.setList(urls);
    storage.setLearningSites([]);
    storage.toggleRedirections();
  }
});

// First-time setup of listeners
chrome.tabs.onActivated.addListener(listeners.userActivatesTab);
listeners.addOnSiteListeners();
