//Probably should rename this file. :P
import browser from "webextension-polyfill";

// import { logProcrastinationEvent, logLearningEvent } from "./util/logger.js";
// import storage from "./util/storage";
import storage from "./util/browserStorage";
// import { learningSites } from "./util/constants";

const session = {
  isActive: false,
  name: "",
  startTime: undefined,
};
let list;
let user;
const data = {
  chromeActive: 0,
  chromeInactive: 0,
};

async function counter() {
  const window = await browser.windows.getCurrent();
  if (window.focused) { // Chrome is focused
    data.chromeActive++; // Log chrome being focused
    const result = await browser.tabs.query({
      active: true,
      currentWindow: true,
    }); // Get name
    const name = parseUrlToName(result[0].url);
    if (list.includes(name)) {
      data[name] = data[name] ? data[name]+1 : 1
      console.log(data);
    }
  } else { // Chrome is not focused
    // If session ongoing, end session
    data.chromeInactive++; // Log chrome open but not focused
  }
}

function logger() { //Logs our data to Firebase, called every 5 minutes.
  storeData(data);
}

export function startCounter() {
  setInterval(counter, 1000); // 1 second
}

function stopCounter() {
  clearInterval(counter);
}

function startLogger() {
  setInterval(logger, 1000 * 60 * 5); // 5 minutes
}

function stopLogger() {
  clearInterval(logger);
}

export async function restartIntervals() {
  stopCounter();
  stopLogger();
  await syncData();
  startCounter();
  startLogger();
}

export async function syncData() {
  const result = await storage.getUserData();
  console.log(result);
  list = result.list.map((item) => item.name);
  user = result.uid;
}

function storeData() {
  //Should push numbers to db
}

function addOnWindowsCloseListener() {
  browser.windows.onRemoved.addListener((details) => {
    // Should push numbers to db
    storeData(data);
  });
}


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

addOnWindowsCloseListener();
