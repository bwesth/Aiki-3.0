import browser from "webextension-polyfill";
import intervals from "./intervals";
import storage from "./util/storage";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    browser.tabs.create({
      url: `chrome-extension://${browser.runtime.id}/index.html?page=settings"`
    });
    const urls = [];
    storage.setList(urls);
    storage.setUid("");
  }
});

browser.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    switch (msg.split(": ")[1]) {
      case "user":
        intervals.restartLogger();
        break;
      case "list":
        intervals.restartCounter();
        break;
    }
    port.postMessage("Response message");
  });
});

intervals.intervalSetup();
intervals.startCounter();
intervals.startLogger();
intervals.addOnWindowsCloseListener();
