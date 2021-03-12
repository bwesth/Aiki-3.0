import { logEvent } from "./util/logger.js";
import storage from "./util/storage";

let currentName;
let user;

//A listener at the start of a session that gathers all the data for us, and logs it atm.
//Probably should split this shit up.
// This is learning site listener
function startSessionListener(details) {
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);

    //If the host is the redirection target, we start a timer.
    storage.getRedirectionSite((site) => {
      storage.getUID((user) => {
        if ((name = site)) {
          logEvent({
            tag: "SESSIONSTART",
            name: currentName || "",
            user: user,
            navigationType: "dunno",
            eventDetails: details,
          });

          chrome.webNavigation.onCompleted.addListener((details) =>
            endSessionListener(details, endtime)
          );
          chrome.webNavigation.onCompleted.removeListener(startSessionListener);
        }
      });
    });
  }
}

//A listener at the end of a session that gathers all the data for us, and logs it atm.
//Probably should split this shit up.
// Learning site listener
function endSessionListener(details) {
  if (details.frameId == "0") {
    console.log(details);
    let name = parseUrlToName(details.url);
    storage.getRedirectionSite((site) => {
      storage.getUID((user) => {
        if (name !== site) {
          logEvent({
            tag: "SESSIONEND",
            name: currentName || "",
            user: user,
            navigationType: "leave :(",
            eventDetails: details,
          });

          chrome.webNavigation.onCompleted.removeListener((details) =>
            endSessionListener(details)
          );
          chrome.webNavigation.onCompleted.addListener((details) =>
            startSessionListener(details)
          );
          // console.log(sessionLength(endTime, name));
        }
      });
    });
  }
}

function userOnSite(details) {
  storage.getList((procNameList) => {
    let list = procNameList.map((site) => site.name);
    if (details.frameId == "0") {
      let name = parseUrlToName(details.url);
      chrome.tabs.query({ active: true }, (response) => {
        //If the site name is in the procUrlList, we start a timer.
        if (list.includes(name) && details.tabId == response[0].id) {
          currentName = name;
          storage.getUID((user) => {
            logEvent({
              tag: "SESSIONSTART",
              name: currentName || "",
              user: user,
              navigationType: "Web Navigation",
              eventDetails: details,
            });
            configSessionStartListeners();
          });
        }
      });
    }
  });
}

function userLeftSite(details) {
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);
    chrome.tabs.query({ active: true }, (response) => {
      if (name !== currentName && details.tabId == response[0].id) {
        //Need to add check for active tab
        storage.getUID((user) => {
          logEvent({
            tag: "SESSIONEND",
            name: currentName || "",
            user: user,
            navigationType: "Web Navigation",
            eventDetails: details,
          });
          configSessionEndListeners();
          currentName = undefined;
        });
      }
    });
  }
}

//Trying to handle what happens when a user activates a tab.
function userActivatesTab(details) {
  // when a user switches tabs, we send a message to the content script (injection.js) to get the URL.
  chrome.tabs.sendMessage(details.tabId, { action: "returnURL" }, (response) =>
    // The returned URL is checked for conditions in a callback.
    tabActivatedCallback(response || chrome.runtime.lastError.message, details)
  );
}

function addOnSiteListeners() {
  chrome.webNavigation.onCompleted.addListener(userOnSite);
}

function removeOnSiteListeners() {
  chrome.webNavigation.onCompleted.removeListener(userOnSite);
}

function addLeftSiteListeners() {
  chrome.tabs.onRemoved.addListener(userLeftSite);
  chrome.webNavigation.onCompleted.addListener(userLeftSite);
}

function removeLeftSiteListeners() {
  chrome.tabs.onRemoved.removeListener(userLeftSite);
  chrome.webNavigation.onCompleted.removeListener(userLeftSite);
}

function configSessionStartListeners() {
  addLeftSiteListeners();
  removeOnSiteListeners();
}

function configSessionEndListeners() {
  addOnSiteListeners();
  removeLeftSiteListeners();
}

function addOnWindowsCloseListener() {
  chrome.windows.onRemoved.addListener((details) => {
    storage.getUID((user) => {
      logEvent({
        tag: "SESSIONEND",
        name: currentName || "",
        user: user,
        navigationType: "Closed chrome window",
        eventDetails: details,
      });
      configSessionEndListeners();
    });
  });
}

addOnWindowsCloseListener();

//Helpers

// Rethink on how to use this inside userActivatesTab with tabActivatedCallback()
async function sendMessage(tabId, action) {
  console.log("Sending message to tab " + tabId);
  console.log(action);
  chrome.tabs.sendMessage(tabId, { action: action }, function (response) {
    console.log("Getting response:");
    console.log(response);
    return response;
  });
}

function parseUrlToName(url) {
  return url.split(".")[1];
}

function tabActivatedCallback(response, details) {
  storage.getUID((user) => {
    // This is a lot of spagetti
    if (response.host) {
      console.log("Getting response:");
      console.log(response);
      // Just want the name of the website, not the scheme or any fragments.
      let nameOfNewTab = parseUrlToName(response.host);
      if (!currentName) {
        console.log(
          "currentName is undefined, checking against list of procrastination sites"
        );
        //If current name IS undefined, then we MAY be arriving at a procrastination site now.
        storage.getList((procNameList) => {
          let list = procNameList.map((site) => site.name);
          console.log(list);
          if (list.includes(nameOfNewTab)) {
            console.log(
              nameOfNewTab + " is on the list. Procrastination session started."
            );
            currentName = nameOfNewTab;
            //If the name of the new tab is in our procNameList, then we need to start a new proc session.
            configSessionStartListeners();
            logEvent({
              tag: "SESSIONSTART",
              name: currentName || "",
              user: user,
              navigationType: "Tab change",
              eventDetails: details,
            });
            currentName = nameOfNewTab;
          } else {
            console.log(
              nameOfNewTab +
                " is not on the list. This is not a procrastination site."
            );
          }
        });
      } else {
        console.log(
          "currentName is defined, checking against activated tab for change of active website"
        );

        //If current name is not "undefined", then that means our current TAB is a procrastination site.
        if (currentName !== nameOfNewTab) {
          console.log(
            "currentName is not same as new tab name. Ending session"
          );
          //If currentName is not the same as the name of the NEW tab, we need to end the session of CurrentName.

          // Need to test if the new tab is a procrastination site, then create a new session without closing the listeners
          storage.getList((procNameList) => {
            let list = procNameList.map((site) => site.name);
            logEvent({
              tag: "SESSIONEND",
              name: currentName || "",
              user: user,
              navigationType: "Tab change",
              eventDetails: details,
            });
            if (list.includes(nameOfNewTab)) {
              console.log("new tab is also a procrastination site.");
              currentName = nameOfNewTab;
              logEvent({
                tag: "SESSIONSTART",
                name: currentName || "",
                user: user,
                navigationType: "Tab change",
                eventDetails: details,
              });
            } else {
              console.log(
                "New tab is not a new procrastination site. Not making a new session."
              );
              configSessionEndListeners();
              currentName = undefined;
            }
          });
        } else {
          console.log("CurrentTab same as new tab, session not broken.");
        }
      }
    } else if (currentName) {
      console.log(
        response.message +
          "\nActive tab is not a website. Might be a new empty tab or similar"
      );
      configSessionEndListeners();
      logEvent({
        tag: "SESSIONEND",
        name: currentName || "",
        user: user,
        navigationType: "Tab change",
        eventDetails: details,
      });

      currentName = undefined;
    }
  });
}

let redirected = false;
let site = "";
function updateSite() {
  storage.getRedirectionSite((storageSite) => {
    site = storageSite;
  });
}
updateSite();
function addWebRequestListener() {
  console.log("WebRequest listener added");
  storage.getList((list) => {
    const urls = list.map((site) => `*://${site.host}/*`);
    chrome.webRequest.onBeforeRequest.addListener(
      redirectionEventListener,
      { urls: urls },
      ["blocking"]
    );
  });
}

function removeWebRequestListener() {
  storage.getList((list) => {
    const urls = list.map((site) => `*://${site.host}/*`);
    console.log("WebRequest listener removed");
    chrome.webRequest.onBeforeRequest.removeListener(
      redirectionEventListener,
      { urls: urls },
      ["blocking"]
    );
  });
}

function redirectionEventListener(details) {
  console.log("Redirecting");
  redirected = true;
  addLearningSiteLoadedListener();
  return {
    redirectUrl: `https://${site}/`,
  };
}

//Working solution, may be a little heavy at the moment.
//Need to find some way to remove eventlistener again. Examples in Aiki.
function addLearningSiteLoadedListener() {
  console.log("Learning site listener added");
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
    leaningSiteLoadedListener(tabId, changeInfo, tab)
  );
}

function removeLearningSiteLoadedListener() {
  console.log("Learning site listener removed");
  chrome.tabs.onUpdated.removeListener(leaningSiteLoadedListener);
}
let sessionTab;

function leaningSiteLoadedListener(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && redirected == true) {
    chrome.tabs.sendMessage(tabId, { action: "redirection" });
    removeLearningSiteLoadedListener();
    sessionTab = tab;
    redirected = false;
    let host = tab.url.split("/")[2];
    addUpdateListener(host);
  }
}

function addUpdateListener(host) {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    updateListener(tabId, changeInfo, tab, host);
  });
}

function removeUpdateListener() {
  chrome.tabs.onUpdated.removeListener(updateListener);
}

function updateListener(tabId, changeInfo, tab, host) {
  if (changeInfo.status === "complete") {
    if (host == tab.url.split("/")[2]) {
      chrome.tabs.sendMessage(tabId, { action: "redirection" });
    }
  }
}

export default {
  userActivatesTab,
  removeLeftSiteListeners,
  addLeftSiteListeners,
  removeOnSiteListeners,
  addOnSiteListeners,
  addWebRequestListener,
  removeWebRequestListener,
  updateSite,
};
