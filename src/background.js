import browser from "webextension-polyfill";
import intervals from "./intervals";
import storage from "./util/storage";
import redirection from "./redirection";
import timer from "./timer";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    setup();
  }
});

async function setup() {
  await storage.clearStorage();
  storage.toggleRedirection();
  storage.setList([]);
  storage.setUid("");
  storage.setRedirectionTime(5000);
  storage.setRewardTime(5000);
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
        redirection.restartRedirectionListener();
        break;
      case "origin":
        timer.startLearningSession();
        redirection.gotoOrigin();
    }
    port.postMessage("Response message");
  });
});

intervals.intervalSetup();
intervals.startCounter();
intervals.startLogger();
intervals.addOnWindowsCloseListener();
