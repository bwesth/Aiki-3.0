import { logProcrastinationEvent, logLearningEvent } from "./util/logger.js";
import storage from "./util/storage";
import { learningSites } from "./util/constants";
let currentName;

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
            logProcrastinationEvent({
              tag: "SESSIONSTART",
              name: currentName || "",
              user: user,
              navigationType: "Web Navigation",
              eventDetails: details,
            });
            configSessionStartListeners();
          });
        }
        if (learningSites.includes(name) && details.tabId == response[0].id) {
          currentName = name;
          storage.getUID((user) => {
            logLearningEvent({
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
        storage.getList((procNameList) => {
          //Need to add check for active tab
          storage.getUID((user) => {
            const event = {
              tag: "SESSIONEND",
              name: currentName || "",
              user: user,
              navigationType: "Web Navigation",
              eventDetails: details,
            };
            if (learningSites.includes(currentName)) {
              logLearningEvent(event);
            } else {
              logProcrastinationEvent(event);
            }
            if (learningSites.includes(name)) {
              //New learning session initiated
              logLearningEvent({
                tag: "SESSIONSTART",
                name: currentName || "",
                user: user,
                navigationType: "Web Navigation",
                eventDetails: details,
              });
            } else if (list.includes(nameOfNewTab)) {
              // New procrastination session initiated
              logProcrastinationEvent({
                tag: "SESSIONSTART",
                name: currentName || "",
                user: user,
                navigationType: "Web Navigation",
                eventDetails: details,
              });
            } else {
              // Neither procrastination nor learning session, not creating session.
              configSessionEndListeners();
              currentName = undefined;
            }
          });
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

function addOnWindowsCloseListener() {
  chrome.windows.onRemoved.addListener((details) => {
    storage.getUID((user) => {
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
    });
  });
}

addOnWindowsCloseListener();

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
            if (list.includes(nameOfNewTab)) {
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
  });
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

export default {
  userActivatesTab,
  removeLeftSiteListeners,
  addLeftSiteListeners,
  removeOnSiteListeners,
  addOnSiteListeners,
};

function parseUrlToName(url) {
  if (url.includes("www")) {
    return url.split(".")[1];
  } else {
    return url.split(".")[0];
  }
}
