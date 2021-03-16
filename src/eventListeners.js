import { logProcrastinationEvent, logLearningEvent } from "./util/logger.js";
import storage from "./util/storage";
import { learningSites } from "./util/constants";

let currentName;
let user;
let procrastinationSites = [];

export function updateProcrastinationSites() {
  console.log("Syncing proc list with storage");
  storage.getList((list) => {
    procrastinationSites = list.map((site) => site.name);
  });
}

export function updateUser() {
  console.log("Syncing user with storage");
  storage.getUID((uid) => {
    user = uid;
  });
}

//FIXME: In general, probably need to do a naming pass on this whole script.
function userOnSite(details) {
  // Checking if top frame (loads of different frames load on major sites)
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);
    // Getting list of the active tabs in each chrome window
    chrome.tabs.query({ active: true, currentWindow: true }, (response) => {
      // Just need the IDs
      // Checking if the event tab is active in any open chrome window.
      // If not, the site was opened in a non-active widnow (like when you use middle-mouse-button)
      if (response[0].id === details.tabId) {
        if (procrastinationSites.includes(name)) {
          // Procrastination session started
          currentName = name;
          logProcrastinationEvent({
            tag: "SESSIONSTART",
            name: currentName || "",
            user: user,
            navigationType: "Web Navigation",
            eventDetails: details,
          });
          configSessionStartListeners();
        }
        if (learningSites.includes(name)) {
          // learning session started
          currentName = name;
          logLearningEvent({
            tag: "SESSIONSTART",
            name: currentName || "",
            user: user,
            navigationType: "Web Navigation",
            eventDetails: details,
          });
          configSessionStartListeners();
        }
      }
    });
  }
}

function userLeftSite(details) {
  // Checking if top frame (loads of different frames load on major sites)
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);
    // Is the name of the new site the same as the name of the current session site?
    if (name !== currentName) {
      // If so, we need to add check if it the event fires in the active tab.
      // If not it is a site opened in another tab that the user is not currently on.
      chrome.tabs.query({ active: true, currentWindow: true }, (response) => {
        // This is the mentioned active tab check
        if (response[0].id === details.tabId) {
          const event = {
            tag: "SESSIONEND",
            name: currentName || "",
            user: user,
            navigationType: "Web Navigation",
            eventDetails: details,
          };
          // If current session name is a learning site, log that, if not, it's a procrastination site
          if (learningSites.includes(currentName)) {
            logLearningEvent(event);
          } else {
            logProcrastinationEvent(event);
          }

          // Now we need to check if the new site is a different learning or procrastination site.
          if (learningSites.includes(name)) {
            // New learning session initiated
            currentName = name;
            logLearningEvent({
              tag: "SESSIONSTART",
              name: currentName || "",
              user: user,
              navigationType: "Web Navigation",
              eventDetails: details,
            });
          } else if (procrastinationSites.includes(name)) {
            // New procrastination session initiated
            currentName = name;
            logProcrastinationEvent({
              tag: "SESSIONSTART",
              name: currentName || "",
              user: user,
              navigationType: "Web Navigation",
              eventDetails: details,
            });
          } else {
            // Neither procrastination nor learning session, not creating new session,
            // but instead finishing closing the original session.
            configSessionEndListeners();
            currentName = undefined;
          }
        }
      });
    } //There is no else here. If name==currentName, we do not need to do anything.
    //Ie: You navigated from YouTube to YouTube.
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

//FIXME: This is a lot of spagetti, need to clean this up at some point.
function tabActivatedCallback(response, details) {
  //If there's no host we probably didn't open a website.
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
      if (procrastinationSites.includes(nameOfNewTab)) {
        console.log(
          nameOfNewTab + " is on the list. Procrastination session started."
        );
        currentName = nameOfNewTab;
        //If the name of the new tab is in our procNameList, then we need to start a new proc session.
        configSessionStartListeners();
        logProcrastinationEvent({
          tag: "SESSIONSTART",
          name: currentName || "",
          user: user,
          navigationType: "Tab change",
          eventDetails: details,
        });
      } else if (learningSites.includes(nameOfNewTab)) {
        // Learning site session
        currentName = nameOfNewTab;
        configSessionStartListeners();
        logLearningEvent({
          tag: "SESSIONSTART",
          name: currentName || "",
          user: user,
          navigationType: "Tab change",
          eventDetails: details,
        });
      } else {
        console.log(
          nameOfNewTab +
            " is not on the list. This is not a procrastination site."
        );
      }
    } else {
      console.log(
        "currentName is defined, checking against activated tab for change of active website"
      );

      //If current name is not "undefined", then that means our NEW tab is either a proc or a prod site.
      if (currentName !== nameOfNewTab) {
        console.log("currentName is not same as new tab name. Ending session");
        //If currentName is not the same as the name of the NEW tab, we need to end the session of CurrentName.

        // Need to test if the new tab is a procrastination site, then create a new session without closing the listeners
        const event = {
          tag: "SESSIONEND",
          name: currentName || "",
          user: user,
          navigationType: "Tab change",
          eventDetails: details,
        };
        if (learningSites.includes(currentName)) {
          logLearningEvent(event);
        } else {
          logProcrastinationEvent(event);
        }
        //Everything up to this point is about figuring out if we must end the current session and how.
        //NOW we need to react based on where we ended up.
        if (procrastinationSites.includes(nameOfNewTab)) {
          console.log("new tab is also a procrastination site.");
          currentName = nameOfNewTab;
          logProcrastinationEvent({
            tag: "SESSIONSTART",
            name: currentName || "",
            user: user,
            navigationType: "Tab change",
            eventDetails: details,
          });
        } else if (learningSites.includes(nameOfNewTab)) {
          currentName = nameOfNewTab;
          logLearningEvent({
            tag: "SESSIONSTART",
            name: currentName || "",
            user: user,
            navigationType: "Tab change",
            eventDetails: details,
          });
        } else {
          console.log(
            "New tab is not a new listed site. Not making a new session."
          );
          configSessionEndListeners();
          currentName = undefined;
        }
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
    const event = {
      tag: "SESSIONEND",
      name: currentName || "",
      user: user,
      navigationType: "Tab change",
      eventDetails: details,
    };
    if (learningSites.includes(currentName)) {
      logLearningEvent(event);
    } else {
      logProcrastinationEvent(event);
    }
    currentName = undefined;
  }
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

function addOnTabActivatedListener() {
  chrome.tabs.onActivated.addListener(userActivatesTab);
}

//Might want to export this and run it in the background.js.
//This listener logs a session end if the current window is closed.
function addOnWindowsCloseListener() {
  chrome.windows.onRemoved.addListener((details) => {
    if (currentName) {
      // CurrentName is defined, session ongoing
      chrome.tabs.query({ active: true }, (response) => {
        if (!response.length > 0) {
          const event = {
            tag: "SESSIONEND",
            name: currentName || "",
            user: user,
            navigationType: "Closed chrome window",
            eventDetails: details,
          };
          if (learningSites.includes(currentName)) {
            logLearningEvent(event);
          } else {
            logProcrastinationEvent(event);
          }
          configSessionEndListeners();
          currentName = undefined;
        }
      });
    }
  });
}

function addWindowFocusChangeListener() {
  chrome.windows.onFocusChanged.addListener(focusChangeCallback);
}

function focusChangeCallback(windowId) {
  //TODO: Trying to add a window focus fix here???
  //TODO: chrome.windows.onFocusChanged DOES NOT FIRE as expected when tabbing off of Chrome. Issue since 2014. :P
  
  // Don't want windows without websites
  if (windowId > -1) {
    // Gotta get the active tab in the now focused window
    chrome.tabs.query({ active: true, currentWindow: true }, (response) => {
      let name = parseUrlToName(response[0].url);
      if (!currentName) {
        // No session, checking for listed sites
        if (procrastinationSites.includes(name)) {
          currentName = name;
          //If the name of the new tab is in our procNameList, then we need to start a new proc session.
          configSessionStartListeners();
          logProcrastinationEvent({
            tag: "SESSIONSTART",
            name: currentName || "",
            user: user,
            navigationType: "Window change",
            eventDetails: response,
          });
        } else if (learningSites.includes(name)) {
          // Learning site session
          currentName = name;
          configSessionStartListeners();
          logLearningEvent({
            tag: "SESSIONSTART",
            name: currentName || "",
            user: user,
            navigationType: "Window change",
            eventDetails: response,
          });
        }
      } else {
        //If current name is not "undefined", then that means our NEW tab is either a proc or a prod site.
        if (currentName !== name) {
          //If currentName is not the same as the name of the NEW tab, we need to end the session of CurrentName.
          // Need to test if the new tab is a procrastination site, then create a new session without closing the listeners
          const event = {
            tag: "SESSIONEND",
            name: currentName || "",
            user: user,
            navigationType: "Window change",
            eventDetails: response,
          };
          if (learningSites.includes(currentName)) {
            logLearningEvent(event);
          } else {
            logProcrastinationEvent(event);
          }
          //Everything up to this point is about figuring out if we must end the current session and how.
          //NOW we need to react based on where we ended up.
          if (procrastinationSites.includes(name)) {
            // New tab is also a listed site
            currentName = name;
            logProcrastinationEvent({
              tag: "SESSIONSTART",
              name: currentName || "",
              user: user,
              navigationType: "Window change",
              eventDetails: response,
            });
          } else if (learningSites.includes(name)) {
            // New tab is also a listed site
            currentName = name;
            logLearningEvent({
              tag: "SESSIONSTART",
              name: currentName || "",
              user: user,
              navigationType: "Window change",
              eventDetails: response,
            });
          } else {
            configSessionEndListeners();
            currentName = undefined;
          }
        }
      }
    });
  }
}

export default {
  userActivatesTab,
  removeLeftSiteListeners,
  addLeftSiteListeners,
  removeOnSiteListeners,
  addOnSiteListeners,
  addOnWindowsCloseListener,
  addOnTabActivatedListener,
  addWindowFocusChangeListener,
};

function parseUrlToName(url) {
  let name = url;
  if (url.includes("http")) {
    name = url.split("//")[1];
  }
  if (url.includes("www")) {
    name = name.split(".")[1];
  } else {
    name = name.split(".")[0];
  }
  return name;
}
