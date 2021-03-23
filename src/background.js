import browser from "webextension-polyfill";

import listeners from "./eventListeners";
import storage from "./util/storage";
import bstorage from "./util/browserStorage";
import { updateProcrastinationSites, updateUser } from "./eventListeners";

console.log(bstorage.getRedirectionToggled())

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    alert("Welcome to Aiki 3");
    const urls = [];
    storage.setList(urls);
    storage.setLearningSites([]);
    storage.toggleRedirection();
    storage.setUID("");
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

setTimeout(() => {
  updateProcrastinationSites();
  updateUser();
}, 100);
