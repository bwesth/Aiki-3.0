import browser from "webextension-polyfill";
import intervals from "./intervals";
import storage from "./util/storage";
import redirection from "./redirection";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    installationSetup();
  }
});

async function installationSetup() {
  await storage.clearStorage();
  storage.setShouldRedirect(true);
  storage.toggleRedirection();
  storage.setList([]);
  storage.setUid("");
  storage.setRedirectionTime(5000);
  storage.setRewardRatio(2);
  const extRef = await browser.management.getSelf();
  browser.tabs.create({
    active: true,
    url: extRef.optionsUrl,
  });
}

function setup() {
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
        redirection.gotoOrigin();
    }
    port.postMessage("Response message");
  });
});

setup();
