import browser from "webextension-polyfill";
import intervals from "./intervals";
import storage from "./util/storage";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    setup();
  }
});

async function setup() {
  storage.setList([]);
  storage.setUid("");
  const extRef = await browser.management.getSelf();
  browser.tabs.create({
    active: true,
    url: extRef.optionsUrl,
  });
}

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
