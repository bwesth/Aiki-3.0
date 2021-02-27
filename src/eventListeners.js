import { logEvent } from "./logger.js";

// Need to fetch these from storage
import {
  procrastinationList as procNameList,
  redirectionTarget,
} from "./resources";
let currentName;

//Creates a listener at the start of a session that gathers all the data for us, and logs it atm.
//Probably should split this shit up.
function startSessionListener(details, beginTime) {
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);
    console.log("This is the host name: " + name);

    //If the host is Codecademy, we start a timer.
    //Need to find a way to change the host we're looking at.
    if ((name = redirectionTarget.name)) {
      beginTime = new Date();

      let logInfo = {
        tag: "SESSIONSTART",
        name: name,
        user: "John",
        navigationType: "dunno",
        details: { date: beginTime, eventDetails: details },
      };

      logEvent(logInfo);

      chrome.webNavigation.onCompleted.addListener((details) =>
        endSessionListener(details, endtime)
      );
      chrome.webNavigation.onCompleted.removeListener(startSessionListener);
    }
  }
}

//Creates a listener at the end of a session that gathers all the data for us, and logs it atm.
//Probably should split this shit up.
function endSessionListener(details, endTime, beginTime) {
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);

    if (name !== redirectionTarget.name) {
      endTime = new Date();
      logEvent({
        tag: "SESSIONEND",
        name: name,
        user: "John",
        navigationType: "leave :(",
        details: { date: beginTime, eventDetails: details },
      });

      chrome.webNavigation.onCompleted.removeListener((details) =>
        endSessionListener(details, endtime)
      );
      chrome.webNavigation.onCompleted.addListener((details) =>
        startSessionListener(details, beginTime)
      );
      console.log(sessionLength(endTime, beginTime, name));
    }
  }
}

function userOnSite(details) {
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);

    console.log("This is the site name: " + name);
    //If the site name is in the procUrlList, we start a timer.
    if (procNameList.includes(name)) {
      currentName = name;

      let logInfo = {
        tag: "SESSIONSTART",
        name: name,
        user: "John",
        navigationType: "Start",
        details: { date: new Date(), eventDetails: details },
      };

      logEvent(logInfo);
      removeOnSiteListeners();
      addLeftSiteListeners();
    }
  }
}

function userLeftSite(details) {
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);

    if (name !== currentName) {
      let logInfo = {
        tag: "SESSIONEND",
        name: currentName,
        user: "John",
        navigationType: "left the site",
        details: { date: new Date(), eventDetails: details },
      };
      logEvent(logInfo);

      addOnSiteListeners();
      removeLeftSiteListeners();

      currentName = undefined;
    }
  }
}

//Trying to handle what happens when a user activates a tab.
function userActivatesTab(details) {
  console.log("Attempting to send message to tab: " + details.tabId);
  console.log(details);
  chrome.tabs.sendMessage(
    details.tabId,
    { action: "returnURL" },
    tabActivatedCallback(response)
  );
}

function addOnSiteListeners() {
  chrome.webNavigation.onCompleted.addListener((details) =>
    userOnSite(details)
  );
}

function removeOnSiteListeners() {
  chrome.webNavigation.onCompleted.removeListener((details) =>
    userOnSite(details)
  );
}

function addLeftSiteListeners() {
  chrome.tabs.onRemoved.addListener((details) => userLeftSite(details));
  chrome.webNavigation.onCompleted.addListener((details) =>
    userLeftSite(details)
  );
}

function removeLeftSiteListeners() {
  chrome.tabs.onRemoved.removeListener((details) => userLeftSite(details));
  chrome.webNavigation.onCompleted.removeListener((details) =>
    userLeftSite(details)
  );
}

export default {
  userActivatesTab,
  removeLeftSiteListeners,
  addLeftSiteListeners,
  removeOnSiteListeners,
  addOnSiteListeners,
};

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

function tabActivatedCallback(response) {
  if (response) {
    console.log("Getting response:");
    console.log(response);
    let nameOfNewTab = parseUrlToName(response.host);
    if (!currentName) {
      console.log(
        "currentName is undefined, checking against list of procrastination sites"
      );
      //If current name IS undefined, then we MAY be arriving at a procrastination site now.
      if (procNameList.includes(nameOfNewTab)) {
        console.log(
          nameOfNewTab + " is on the list. Procrastination session started."
        );
        //If the name of the new tab is in our procNameList, then we need to start a new proc session.
        addLeftSiteListeners();
        removeOnSiteListeners();
        logInfo("SESSIONSTART", "tab change", details);
        currentName = nameOfNewTab;
      }
    } else {
      console.log(
        "currentName is defined, checking against activated tab for change of active website"
      );
      //If current name is not "undefined", then that means our current TAB is a procrastination site.
      if (currentName !== nameOfNewTab) {
        console.log("currentName is not same as new tab");
        //If currentName is not the same as the name of the NEW tab, we need to end the session of CurrentName.
        removeLeftSiteListeners();
        addOnSiteListeners();
        logInfo("SESSIONEND", "tab change", details);
        currentName = undefined;
      }
    }
  }
}

// This needs a rethink
function logInfo(tag, type, details) {
  logEvent({
    tag: tag,
    name: currentName,
    user: "John",
    navigationType: type,
    details: { date: new Date().toLocaleString, eventDetails: details },
  });
}
