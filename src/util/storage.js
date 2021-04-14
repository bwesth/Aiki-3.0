import browser from "webextension-polyfill";
const storage = browser.storage.local;

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
  let result = await storage.get("list");
  return result.list;
}

function setUid(uid) {
  storage.set({ uid: uid });
}

async function getUid() {
  let result = await storage.get("uid");
  return result.uid;
}

async function getRedirectionSite() {
  let result = await storage.get("redirectionSite");
  return result.redirectionSite;
}

function setRedirectionSite(siteName) {
  storage.set({ redirectionSite: siteName });
}

function setOriginUrl(url) {
  storage.set({ originUrl: url });
}

async function getOriginUrl() {
  let result = await storage.get("originUrl");
  return result.originUrl;
}

function removeOriginUrl() {
  storage.remove("originUrl");
}

export default {
  getUserData,
  setOriginUrl,
  getOriginUrl,
  removeOriginUrl,
  setList,
  getList,
  setUid,
  getUid,
  getRedirectionSite,
  setRedirectionSite,
  toggleRedirection,
  getRedirectionToggled,
};
