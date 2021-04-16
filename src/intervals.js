import browser from "webextension-polyfill";
import storage from "./util/storage";
import firebase from "./util/firebase";
import { parseUrl, makeDate } from "./util/utilities";

let list;
let user;
let data = {
  chromeActive: 0,
  chromeInactive: 0,
};
let counterId;
let loggerId;

function intervalSetup() {
  syncUser();
  syncList();
  startCounter();
  startLogger();
  addOnWindowsCloseListener();
}

async function counter() {
  const window = await browser.windows.getCurrent();
  if (window.focused) {
    data.chromeActive++;
    const result = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const name = parseUrl(result[0].url).name;
    if (list.includes(name)) {
      data[name] = data[name] ? data[name] + 1 : 1;
    }
  } else {
    data.chromeInactive++;
  }
}

function logger() {
  storeData(data);
  resetData();
}

function startCounter() {
  counterId = setInterval(counter, 1000); // 1 second
}

function stopCounter() {
  clearInterval(counterId);
}

function startLogger() {
  loggerId = setInterval(logger, 1000 * 60 * 5); // 5 minutes
}

function stopLogger() {
  clearInterval(loggerId);
}

async function restartCounter() {
  stopCounter();
  await syncList();
  startCounter();
}

async function restartLogger() {
  stopLogger();
  storeData(data);
  resetData();
  await syncUser();
  startLogger();
}

async function syncUser() {
  const result = await storage.getUid();
  user = result;
}

async function syncList() {
  const result = await storage.getList();
  list = result ? result.map((item) => item.name) : [];
}

function storeData(data) {
  if (user) {
    const entry = { data: data, user: user, date: makeDate() };
    firebase.addLog(entry, "session");
  }
}

function resetData() {
  data = {
    chromeActive: 0,
    chromeInactive: 0,
  };
}

function addOnWindowsCloseListener() {
  browser.windows.onRemoved.addListener(() => {
    storeData(data);
    resetData();
  });
}

export default {
  intervalSetup,
  counter: { start: startCounter, restart: restartCounter },
  logger: { start: startLogger, restart: restartLogger },
  addOnWindowsCloseListener,
};
