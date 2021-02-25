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

// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     redirected = true;
//     // console.log(getList());
//     return {
//       redirectUrl:
//         // "https://app.clickup.com/4637248/v/b/li/46667048"
//         "https://www.codecademy.com",
//       // "https://www.sololearn.com/profile/16312476"
//     };
//   },
//   {
//     urls: [
//       "*://www.youtube.com/*",
//       "*://www.facebook.com/*",
//       "*://www.reddit.com/*",
//       "*://www.9gag.com/*",
//     ],
//   },
//   ["blocking"]
// );

//Working solution, may be a little heavy at the moment.
//Need to find some way to remove eventlistener again. Examples in Aiki.
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   // console.log(changeInfo);
//   if (changeInfo.status === "complete" && redirected) {
//     sendMessage(tabId, "www.codecademy.com");
//     redirected = false;
//     sessionTab = tab;
//     let host = tab.url.split("/")[2];
//     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//       if (host == tab.url.split("/")[2]) {
//         sendMessage(tabId, "www.codecademy.com");
//       }
//     });
//   }
// });

function sendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, { message: message }, function (response) {
    return response;
  });
}

let beginTime;
let endTime;
// chrome.webNavigation.onCompleted.addListener(startSessionListener);
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

let procNameList = [
  "youtube",
  "facebook",
  "reddit",
  "9gag",
];

let currentName;

function userOnSite(details) {
  if (details.frameId == '0') {
    let name = parseUrlToName(details.url);

    console.log("This is the site name: " + name);
    //If the site name is in the procUrlList, we start a timer. 
    if (procNameList.includes(name)) {
      currentName = name;

      let logInfo = {tag:"SESSIONSTART", name: name, user:"John", navigationType:"Start",moar:{date:new Date(), eventDetails:details}}

      logEvent(logInfo);
      removeOnSiteListeners()
      addLeftSiteListeners()
      
    }
  }
}

function userLeftSite(details) {
  if (details.frameId == '0'){
    let name = parseUrlToName(details.url);

    if (name !== currentName) {

      let logInfo = {tag:"SESSIONEND", name: currentName, user:"John", navigationType:"left the site", moar:{date:new Date(), eventDetails:details}}
      logEvent(logInfo);

      addOnSiteListeners()
      removeLeftSiteListeners()

      currentName = undefined;
    }
  }
}

//Trying to handle what happens when a user activates a tab.
function userActivatesTab(details) {
  let url = sendMessage(details.tabId,{action:"returnURL"});
  console.log(url)
  nameOfNewTab = parseUrlToName(url);

  //
if (currentName) { //If current name is not undefined, then that means our current TAB is a procrastination site.
    if (currentName !== nameOfNewTab) { //If currentName is not the same as the name of the NEW tab, we need to end the session of CurrentName.
      removeLeftSiteListeners();
      addOnSiteListeners();

      let logInfo = {tag:"SESSIONEND", name: currentName, user:"John", navigationType:"Left tab", moar:{date:new Date(), eventDetails:details}}
      logEvent(logInfo);

      currentName = undefined;
    }
  } else { //If current name IS undefined, then we MAY be arriving at a procrastination site now.
    if (procNameList.includes(nameOfNewTab)) { //If the name of the new tab is in our procNameList, then we need to start a new proc session.
      addLeftSiteListeners();
      removeOnSiteListeners();

      let logInfo = {tag:"SESSIONSTART", name: currentName, user:"John", navigationType:"Opened new tab", moar:{date:new Date(), eventDetails:details}}
      logEvent(logInfo);

      currentName = nameOfNewTab;
    }
  }
  //
}

chrome.tabs.onActivated.addListener(userActivatesTab)

function addOnSiteListeners () {
  chrome.webNavigation.onCompleted.addListener(userOnSite)
}

function removeOnSiteListeners() {
  chrome.webNavigation.onCompleted.removeListener(userOnSite)
}

function addLeftSiteListeners() {
  chrome.tabs.onRemoved.addListener(userLeftSite)
  chrome.webNavigation.onCompleted.addListener(userLeftSite)
}

function removeLeftSiteListeners() {
  chrome.tabs.onRemoved.removeListener(userLeftSite)
  chrome.webNavigation.onCompleted.removeListener(userLeftSite)
}

// First-time setup of listeners
addOnSiteListeners()

function parseUrlToName(url) {
  let host = url.split("/")[2];
  let name = host.split(".")[1];
  return name;
};


// https://www.facebook.com/
// https://www.youtube.com/
// https://www.youtube.com/watch?v=u1j1ZHnwfpU&t=590s
// Example split URLS

//When is a user on a website? What events indicate that
//webNavigation.onCompleted - Webpage has been loaded in
//tabs.onActivated - Tab is activated

//When has a user left/entered a new a website, for whatever reason?
//tabs.onRemoved - closed the current tab
//webNagivation.onCompleted - user has loaded a new URL (comparison)
//tabs.onActivated - user has chosen a new tab (comparison)