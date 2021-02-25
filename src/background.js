import browser from "webextension-polyfill";
import {logEvent} from "./logger.js";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    alert("Hello");
    const urls = [
      "*://www.youtube.com/*",
      "*://www.facebook.com/*",
      "*://www.reddit.com/*",
      "*://www.9gag.com/*",
    ];
    setList(urls);
  }
});

function setList(list) {
  chrome.storage.sync.set({ list: list }, function (value) {
    // console.log(value);
  });
}

function getList() {
  chrome.storage.sync.get("list", function (data) {
    return data.list;
  });
}
let sessionTab;
let list;
chrome.storage.sync.get("list", function (data) {
  list = data.list;
  // console.log(list);
});

let redirected = false;

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    redirected = true;
    // console.log(getList());
    return {
      redirectUrl:
        // "https://app.clickup.com/4637248/v/b/li/46667048"
        "https://www.codecademy.com",
      // "https://www.sololearn.com/profile/16312476"
    };
  },
  {
    urls: [
      "*://www.youtube.com/*",
      "*://www.facebook.com/*",
      "*://www.reddit.com/*",
      "*://www.9gag.com/*",
    ],
  },
  ["blocking"]
);

//Working solution, may be a little heavy at the moment.
//Need to find some way to remove eventlistener again. Examples in Aiki.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // console.log(changeInfo);
  if (changeInfo.status === "complete" && redirected) {
    sendMessage(tabId, "www.codecademy.com");
    redirected = false;
    sessionTab = tab;
    let host = tab.url.split("/")[2];
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (host == tab.url.split("/")[2]) {
        sendMessage(tabId, "www.codecademy.com");
      }
    });
  }
});

function sendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, { message: message }, function (response) {
  });
}

let beginTime;
let endTime;

chrome.webNavigation.onCompleted.addListener(startSessionListener);

/*Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired,
but you can listen to onUpdated events so as to be notified when a URL is set.*/
chrome.tabs.onActivated

/* */
chrome.tabs.onRemoved

//Creates a listener at the start of a session that gathers all the data for us, and logs it atm.
//Probably should split this shit up.
function startSessionListener(details) {
  if (details.frameId == '0') {
    let host = details.url.split("/")[2];
    console.log("This is the host: " + host);

    //If the host is Codecademy, we start a timer. 
    //Need to find a way to change the host we're looking at.
    if (host = "www.codecademy.com") {
      beginTime = new Date();

      //What do we want here?
      //WHAT/HOW/WHEN/WHO
      //WHO/WHAT/HOW/WHEN/EXTRA SHIT
      //USER, HOST, NAVIGATIONTYPE, TIMESTAMP, EXTRA
      let logInfo = {tag:"SESSIONSTART", host: host, user:"John", navigationType:"dunno",moar:{date:beginTime, eventDetails:details}}

      logEvent(logInfo);
          
      chrome.webNavigation.onCompleted.addListener(endSessionListener);
      chrome.webNavigation.onCompleted.removeListener(startSessionListener);
    }
  }
};

//Creates a listener at the end of a session that gathers all the data for us, and logs it atm.
//Probably should split this shit up.
function endSessionListener(details) {
    if (details.frameId == '0'){
      let host = details.url.split("/")[2];

      if (host !== "www.codecademy.com") {
        endTime = new Date();

        let logInfo = {tag:"SESSIONEND", host: host, user:"John", navigationType:"leave :(", moar:{date:beginTime, eventDetails:details}}
        logEvent(logInfo);

        chrome.webNavigation.onCompleted.removeListener(endSessionListener);
        chrome.webNavigation.onCompleted.addListener(startSessionListener);
        console.log(sessionLength(endTime,beginTime, host));
      }
    }
};

//Attempts to calculate the given length for a session.
function sessionLength(date1, date2, host) {
  let time = date1.getTime() - date2.getTime();
  return("You spent " + Math.floor(time/1000) + " seconds on " + host);
}

