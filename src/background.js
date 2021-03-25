import browser from "webextension-polyfill";

import { syncData, startCounter } from "./eventListeners";
import storage from "./util/browserStorage";
import bstorage from "./util/browserStorage";

// console.log(bstorage.getRedirectionToggled())

browser.runtime.onInstalled.addListener(({ reason }) => {
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

browser.extension.onConnect.addListener(function (port) {
  console.log("Connected .....");
  port.onMessage.addListener(function (msg) {
    console.log("message recieved " + msg);
    console.log(msg.split(": ")[1]);
    switch (msg.split(": ")[1]) {
      case "user":
        syncData();
        break;
      case "list":
        syncData();
        break;
    }
    port.postMessage("Response message");
  });
});

syncData();
startCounter();
