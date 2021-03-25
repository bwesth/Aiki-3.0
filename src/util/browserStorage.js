import browser from "webextension-polyfill";
const storage = browser.storage.local;

function toggleRedirection() {
  storage
    .get("toggled")
    .then((data) => storage.set({ toggled: !data.toggled }));
}

async function getUserData(){
  const result = await storage.get(["list", "uid"])
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

function setUID(uid) {
  storage.set({ uid: uid });
}

async function getUID() {
  let result = await storage.get("uid");
  return result.uid;
}

// function updateSiteTime(siteName, timeSpent) {
//   storage.set({ [siteName]: timeSpent }, function (value) {
//     console.log(`Time spent on ${siteName} updated to ${timeSpent}`);
//   });
// }

// function getSiteTime(siteName, callback) {
//   storage.get(sitename, (data) => callback(data[siteName]));
// }

// function getSiteTimeList(sites, callback) {
//   let list = sites.map((site) => getSiteTime(site, (data) => data));
//   callback(list);
// }

async function getLearningSites() {
  let result = await storage.get("learningSites");
  return result.learningSites;
}

function setLearningSites(list) {
  storage.set({ learningSites: list });
}

async function getRedirectionSite() {
  let result = await storage.get("redirectionSite");
  return result.redirectionSite;
}

function setRedirectionSite(siteName) {
  storage.set({ redirectionSite: siteName });
}

export default {
  getUserData,
  setList,
  getList,
  setUID,
  getUID,
  getRedirectionSite,
  setRedirectionSite,
  setLearningSites,
  getLearningSites,
  toggleRedirection,
  getRedirectionToggled,
};
