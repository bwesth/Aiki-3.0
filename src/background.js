import browser from "webextension-polyfill";
import listeners from "./eventListeners";
import storage from "./util/storage";
import { updateProcrastinationSites, updateUser } from "./eventListeners";

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
listeners.addOnTabActivatedListener();
listeners.addOnSiteListeners();
listeners.addOnWindowsCloseListener();
listeners.addWindowFocusChangeListener();

chrome.extension.onConnect.addListener(function (port) {
  console.log("Connected .....");
  port.onMessage.addListener(function (msg) {
    console.log("message recieved " + msg);
    console.log(msg.split(": ")[1]);
    switch (msg.split(": ")[1]) {
      case "user":
        updateUser();
        break;
      case "list":
        updateProcrastinationSites();
        break;
    }
    port.postMessage("Response message");
  });
});
