//Creates a listener at the start of a session that gathers all the data for us, and logs it atm.
//Probably should split this shit up.
function startSessionListener(details, beginTime) {
  if (details.frameId == "0") {
    let host = details.url.split("/")[2];
    console.log("This is the host: " + host);

    //If the host is Codecademy, we start a timer.
    //Need to find a way to change the host we're looking at.
    if ((host = "www.codecademy.com")) {
      beginTime = new Date();

      let logInfo = {
        tag: "SESSIONSTART",
        host: host,
        user: "John",
        navigationType: "dunno",
        moar: { date: beginTime, eventDetails: details },
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
    let host = details.url.split("/")[2];

    if (host !== "www.codecademy.com") {
      endTime = new Date();

      let logInfo = {
        tag: "SESSIONEND",
        host: host,
        user: "John",
        navigationType: "leave :(",
        moar: { date: beginTime, eventDetails: details },
      };
      logEvent(logInfo);

      chrome.webNavigation.onCompleted.removeListener((details) =>
        endSessionListener(details, endtime)
      );
      chrome.webNavigation.onCompleted.addListener((details) =>
        startSessionListener(details, beginTime)
      );
      console.log(sessionLength(endTime, beginTime, host));
    }
  }
}

function userOnSite(details, currentName) {
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
        moar: { date: new Date(), eventDetails: details },
      };

      logEvent(logInfo);
      removeOnSiteListeners();
      addLeftSiteListeners();
    }
  }
}

function userLeftSite(details, currentName) {
  if (details.frameId == "0") {
    let name = parseUrlToName(details.url);

    if (name !== currentName) {
      let logInfo = {
        tag: "SESSIONEND",
        name: currentName,
        user: "John",
        navigationType: "left the site",
        moar: { date: new Date(), eventDetails: details },
      };
      logEvent(logInfo);

      addOnSiteListeners();
      removeLeftSiteListeners();

      currentName = undefined;
    }
  }
}

//Trying to handle what happens when a user activates a tab.
function userActivatesTab(details, currentName, procNameList) {
  sendMessage(details.tabId, "returnURL").then((response) => {
    console.log(response);
    // nameOfNewTab = parseUrlToName(response);
  });
  // let nameOfNewTab = await parseUrlToName(
  //   await sendMessage(details.tabId, "returnURL")
  // );
  let nameOfNewTab = "";
  //
  if (currentName) {
    //If current name is not undefined, then that means our current TAB is a procrastination site.
    if (currentName !== nameOfNewTab) {
      //If currentName is not the same as the name of the NEW tab, we need to end the session of CurrentName.
      removeLeftSiteListeners();
      addOnSiteListeners();

      let logInfo = {
        tag: "SESSIONEND",
        name: currentName,
        user: "John",
        navigationType: "Left tab",
        moar: { date: new Date(), eventDetails: details },
      };
      logEvent(logInfo);

      currentName = undefined;
    }
  } else {
    //If current name IS undefined, then we MAY be arriving at a procrastination site now.
    if (procNameList.includes(nameOfNewTab)) {
      //If the name of the new tab is in our procNameList, then we need to start a new proc session.
      addLeftSiteListeners();
      removeOnSiteListeners();

      let logInfo = {
        tag: "SESSIONSTART",
        name: currentName,
        user: "John",
        navigationType: "Opened new tab",
        moar: { date: new Date(), eventDetails: details },
      };
      logEvent(logInfo);

      currentName = nameOfNewTab;
    }
  }
  //
}

function addOnSiteListeners(currentName) {
  chrome.webNavigation.onCompleted.addListener((details) =>
    userOnSite(details, currentName)
  );
}

function removeOnSiteListeners(currentName) {
  chrome.webNavigation.onCompleted.removeListener((details) =>
    userOnSite(details, currentName)
  );
}

function addLeftSiteListeners(currentName) {
  chrome.tabs.onRemoved.addListener((details) =>
    userLeftSite(details, currentName)
  );
  chrome.webNavigation.onCompleted.addListener((details) =>
    userLeftSite(details, currentName)
  );
}

function removeLeftSiteListeners(currentName) {
  chrome.tabs.onRemoved.removeListener((details) =>
    userLeftSite(details, currentName)
  );
  chrome.webNavigation.onCompleted.removeListener((details) =>
    userLeftSite(details, currentName)
  );
}

export default {
  userActivatesTab,
  removeLeftSiteListeners,
  addLeftSiteListeners,
  removeOnSiteListeners,
  addOnSiteListeners,
};

async function sendMessage(tabId, action) {
  console.log("Sending message to tab " + tabId);
  console.log(action);
  chrome.tabs.sendMessage(tabId, { action: action }, function (response) {
    console.log("Getting response:");
    console.log(response);
    return response;
  });
}

async function parseUrlToName(url) {
  let host = url.split("/")[2];
  let name = host.split(".")[1];
  return name;
}
