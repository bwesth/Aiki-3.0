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
    console.log(value);
  });
}

function getList() {
  chrome.storage.sync.get("list", function (data) {
    return data.list;
  });
}
let list;
chrome.storage.sync.get("list", function (data) {
  list = data.list;
  console.log(list);
});

// Old redirection function.
function redirect(tabId) {
  chrome.tabs.update(tabId, {
    url: "https://app.clickup.com/4637248/v/b/li/46667272",
  });
  console.log(document.location);
}

let redirected = false;

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    redirected = true;
    console.log(getList());
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
    // [...list],
    // [...getList()],
  },
  ["blocking"]
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(changeInfo);
  if (changeInfo.status === "complete" && redirected) {
    sendMessage(tabId, "www.codecademy.com");
    redirected = false;
    let host = tab.url.split("/")[2];
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (host == tab.url.split("/")[2]) {
        sendMessage(tabId, "www.codecademy.com");
      }
    });
  }
});

/* Did not work with codecademy. Seems the event does not fire automatically */
// chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
//   if (redirected) {
//     sendMessage(details.tabId, "www.codecademy.com");
//     redirected = false;
//   }
// });

/* Did not work with codecademy. Seems the event does not fire automatically */
// chrome.webNavigation.onCompleted.addListener(function (details) {
//   if (redirected) {
//     sendMessage(details.tabId, "www.codecademy.com");
//     redirected = false;
//   }
// });

function sendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, { message: message }, function (response) {
    console.log(response.message);
  });
}
