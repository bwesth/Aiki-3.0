import browser from "webextension-polyfill";
import { logEvent } from "./logger.js";
import events from "./eventListeners";
import firebase from "./firebase";


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

let beginTime;
let endTime;
// chrome.webNavigation.onCompleted.addListener((details => startSessionListener(details, endTime, beginTime)));

//Attempts to calculate the given length for a session.
function sessionLength(date1, date2, host) {
  let time = date1.getTime() - date2.getTime();
  return "You spent " + Math.floor(time / 1000) + " seconds on " + host;
}


// let currentName;

chrome.tabs.onActivated.addListener((details) =>
  events.userActivatesTab(details)
);

// First-time setup of listeners
// events.addOnSiteListeners();

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
