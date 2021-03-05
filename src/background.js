import browser from "webextension-polyfill";
import { logEvent } from "./util/logger.js";
import events from "./eventListeners";
import firebase from "./util/firebase";
import storage from "./util/storage";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    alert("Hello");
    const urls = [
      // Default procrastination sites.
    ];
    storage.setList(urls);
    storage.setLearningSites([]);
  }
});

// storage.getList((list) => console.log(list));

let sessionTab;
let list;
// chrome.storage.sync.get("list", function (data) {
//   list = data.list;
//   // console.log(list);
// });

let redirected = false;
// storage.setRedirectionSite("https://www.codecademy.com/")

// storage.getList((list) => {
//   storage.getRedirectionSite((site) => {
//     chrome.webRequest.onBeforeRequest.addListener(
//       function (details) {
//         console.log("Redirecting");
//         redirected = true;
//         return {
//           redirectUrl: site,
//         };
//       },
//       {
//         urls: list,
//       },
//       ["blocking"]
//     );
//   });
// });

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

chrome.tabs.onActivated.addListener(events.userActivatesTab);

// First-time setup of listeners
events.addOnSiteListeners();

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
