import browser from "webextension-polyfill";
const storage = browser.storage.local;

function clearStorage() {
  storage.clear();
}

function toggleRedirection() {
  storage.get("toggled").then((data) => {
    storage.set({ toggled: !data.toggled });
  });
}

async function getUserData() {
  const result = await storage.get(["list", "uid"]);
  return result;
}

async function getRedirectionToggled() {
  const result = await storage.get("toggled");
  return result.toggled;
}

function setList(list) {
  storage.set({ list: list });
}

async function getList() {
  const result = await storage.get("list");
  return result.list;
}

function setUid(uid) {
  storage.set({ uid: uid });
}

async function getUid() {
  const result = await storage.get("uid");
  return result.uid;
}

async function getRedirectionSite() {
  const result = await storage.get("redirectionSite");
  return result.redirectionSite;
}

function setRedirectionSite(siteName) {
  storage.set({ redirectionSite: siteName });
}

function setOrigin(url) {
  storage.set({ origin: url });
}

async function getOrigin() {
  const result = await storage.get("origin");
  return result.origin;
}

function removeOrigin() {
  storage.remove("origin");
}

function setRedirectionTime(time) {
  storage.set({ redirectionTime: time });
}

async function getRedirectionTime() {
  const result = await storage.get("redirectionTime");
  return result.redirectionTime;
}

function setRewardRatio(time) {
  storage.set({ rewardTime: time });
}

function getRewardRatio() {
  storage.get("rewardTime");
}

function getRewardTime() {
  storage.set("rewardTime");
}

function setRewardTime(time) {
  storage.set({ rewardTime: time });
}

async function getUserTimes() {
  const result = await storage.get([
    "rewardTime",
    "rewardRatio",
    "redirectionTime",
  ]);
  return result;
}

async function getRewardRatio() {
  const result = await storage.get("rewardTime");
  return result.rewardTime;
}

async function setShouldRedirect(boolean) {
  console.log("Should redirect set to: ", boolean);
  storage.set({ shouldRedirect: boolean });
}

async function getShouldRedirect() {
  const result = await storage.get("shouldRedirect");
  return result.shouldRedirect;
}

export default {
  timeSettings: {
    getAll: getUserTimes,
    learningTime: { get: getRedirectionTime, set: setRedirectionTime },
    rewardTime: { get: getRewardTime, set: setRewardTime },
    rewardRatio: { get: getRewardRatio, set: setRewardRatio },
  },
  shouldRedirect: { get: getShouldRedirect, set: setShouldRedirect },
  clearStorage,
  getUserData,
  origin: { get: getOrigin, set: setOrigin, remove: removeOrigin },
  list: { set: setList, get: getList },
  uid: { set: setUid, get: getUid },
  redirectionSite: { get: getRedirectionSite, set: setRedirectionSite },
  redirection: { toggle: toggleRedirection, get: getRedirectionToggled },
};
