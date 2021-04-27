import browser from "webextension-polyfill";
import intervals from "./intervals";
import storage from "./util/storage";
import redirection from "./redirection";
import timer from "./timer";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    installationSetup();
  }
});

async function installationSetup() {
  await storage.clearStorage();
  storage.shouldRedirect.set(true);
  storage.redirection.toggle();
  storage.list.set([]);
  storage.uid.set("");
  storage.timeSettings.learningTime.set(5000);
  storage.timeSettings.rewardTime.set(5000);
  storage.timeSettings.rewardRatio.set(2);
  const extRef = await browser.management.getSelf();
  browser.tabs.create({
    active: true,
    url: extRef.optionsUrl,
  });
}

function setup() {
  storage.shouldRedirect.set(true)
  storage.warningOption.set(true);
  intervals.intervalSetup();
  redirection.navigationListener.start();
  redirection.tabChangeListener.start();
}

browser.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    switch (msg.split(": ")[1]) {
      case "user":
        intervals.logger.restart();
        break;
      case "list":
        intervals.counter.restart();
        redirection.navigationListener.restart();
        break;
      case "origin":
        redirection.gotoOrigin(msg.split(": ")[2]);
        break;
      case "timer":
        port.postMessage(timer.getTime());
        break;
    }
  });
});

setup();
