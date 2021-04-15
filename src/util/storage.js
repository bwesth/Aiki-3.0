import browser from "webextension-polyfill";
const storage = browser.storage.local;

function clearStorage(){
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
  console.log("this is the result of getRedirectionToggled: ",result);
  console.log("this is result.toggled ",result.toggled);
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
  storage.set({redirectionTime: time})
}

async function getRedirectionTime() {
  const result = await storage.get("redirectionTime");
  return result.redirectionTime;
}

function setRewardTime(time) {
  storage.set({rewardTime: time})
}

async function getRewardTime() {
  const result = await storage.get("rewardTime");
  return result.rewardTime;
}

export default {
  clearStorage,
  getUserData,
  setOrigin,
  getOrigin,
  removeOrigin,
  setList,
  getList,
  setUid,
  getUid,
  getRedirectionSite,
  setRedirectionSite,
  toggleRedirection,
  getRedirectionToggled,
  setRedirectionTime,
  getRedirectionTime,
  setRewardTime,
  getRewardTime
};
