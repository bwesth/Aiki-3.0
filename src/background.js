import browser from "webextension-polyfill";
import intervals from "./intervals";
import storage from "./util/storage";
import redirection from "./redirection";
import timer from "./timer";
import { setTheme } from "./util/themes";

/* Add listener if the runtime is caused by initial installation of extension.
If so, run initial setup */
browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    installationSetup();
  }
});

/**
 * @async @function
 * @description Runs the initial installation setup, creating values in storage used by the application,
 * as well as automatically opening the settings page such that the user can input user ID and procrastination websites. */
async function installationSetup() {
  storage.clearStorage();
  storage.stats.init();
  setTheme("light");
  storage.shouldRedirect.set(true);
  storage.redirection.toggle();
  storage.list.set([]);
  storage.uid.set("");
  storage.timeSettings.learningTime.set(5000);
  storage.timeSettings.rewardTime.set(5000);
  const extRef = await browser.management.getSelf();
  browser.tabs.create({
    active: true,
    url: extRef.optionsUrl,
  });
}

/**
 * @function
 * @description runtime instance setup function.
 * initiates setup of interval logging functionality, as well as adding navigation and tab change listeners. */
async function setup() {
  // console.log(await storage.stats.getAll());
  // storage.stats.storeSession({theguardian: 10, sololearn: 10})
  intervals.intervalSetup();
  storage.shouldRedirect.set(true);
  redirection.navigationListener.start();
  redirection.tabChangeListener.start();
  redirection.windowChangeListener.start();
  redirection.addOriginTabCloseListener()
}

/* Add listener for incomming communication from extension options page runtime and extension popup runetime 

case "user" means the user added or removed a user ID. This requires the logger interval to be reset, 
as the user value in the interval function is no longer correct. 

case "list" means the user added or removed a procrastination website in settings page. 
This requires the counting interval as well as the navigationListener need to be reset, 
as these use the procrastination list.

case "origin" is called by the popup runtime and means the tab that was used to open a procrastination website should
return to the original procrastination website (ie. the user clicked "continue" or "Emergency skip")

case "timer" is called by the popup runtime and returns the current time values 
(ie. learning time remaining and extra time spent). */
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

/* Setup is run at each runtime creation (user opens the browser application) */
setup();
