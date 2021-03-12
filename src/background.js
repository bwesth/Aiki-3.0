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

//Attempts to calculate the given length for a session.
function sessionLength(date1, date2, host) {
  let time = date1.getTime() - date2.getTime();
  return "You spent " + Math.floor(time / 1000) + " seconds on " + host;
}

chrome.tabs.onActivated.addListener(listeners.userActivatesTab);

// First-time setup of listeners
listeners.addOnSiteListeners();
storage.getRedirectionToggled((toggled) => {
  toggled && listeners.addWebRequestListener();
});

chrome.extension.onConnect.addListener(function (port) {
  console.log("Connected .....");
  port.onMessage.addListener(function (msg) {
    console.log("message recieved " + msg);
    console.log(msg.split(": ")[1]);
    if (msg.split(": ")[1] === "on") {
      listeners.addWebRequestListener();
      listeners.updateSite();
    } else {
      listeners.removeWebRequestListener();
    }
    port.postMessage("Hi Popup.js");
  });
});
