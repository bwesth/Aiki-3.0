import browser from "webextension-polyfill";

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
    // console.log(response.message);
  });
}

function logWhatever(string) {
  const currentDate = new Date();
  const timestamp = currentDate.now;
  // console.log(timestamp + " " + string);
}

let beginTime;
let endTime;


//When you load codecademy.
// chrome.webNavigation.onCompleted.addListener((details) => {

//   if (details.frameId == '0') {
//     let host = details.url.split("/")[2];

//     console.log("This is the host: " + host);
    
//       //If the host is Codecademy, we start a timer.
//       if (host = "www.codecademy.com") {
//         beginTime = new Date().toLocaleString();

//         //We start a new listener that detects when we navigate away from the page, and logs an end time.
//         chrome.webNavigation.onCompleted.addListener((details) => {
//           if (details.frameId == '0'){
//             let host2 = details.url.split("/")[2];

//             if (host2 !== "www.codecademy.com") {
//               endTime = new Date().toLocaleString();
//               console.log("The begin time was: " + beginTime);
//               console.log("The end time was: " + endTime);
//             }
//         }})
//       }
//   }
// });

chrome.webNavigation.onCompleted.addListener(startSession);

/*Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired,
but you can listen to onUpdated events so as to be notified when a URL is set.*/
chrome.tabs.onActivated

/* */
chrome.tabs.onRemoved

function startSession(details) {
    if (details.frameId == '0') {
      let host = details.url.split("/")[2];
  
      console.log("This is the host: " + host);
      
        //If the host is Codecademy, we start a timer.
        if (host = "www.codecademy.com") {
          beginTime = new Date();
        }
      
      chrome.webNavigation.onCompleted.addListener(endSession);
      chrome.webNavigation.onCompleted.removeListener(startSession);
  }
};

function endSession(details) {
    if (details.frameId == '0'){
      let host = details.url.split("/")[2];

      if (host !== "www.codecademy.com") {
        endTime = new Date();
        console.log("The begin time was: " + beginTime.toLocaleString());
        console.log("The end time was: " + endTime.toLocaleString());

        chrome.webNavigation.onCompleted.removeListener(endSession);
        chrome.webNavigation.onCompleted.addListener(startSession);
        console.log(sessionLength(endTime,beginTime, host));
      }
    }
};


function sessionLength(date1, date2, host) {
  let time = date1.getTime() - date2.getTime();
  return("You spent " + Math.floor(time/1000) + " seconds on " + host);
}

