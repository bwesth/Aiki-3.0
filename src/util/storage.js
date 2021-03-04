const storage = chrome.storage.sync;

function setList(list) {
  storage.set({ list: list }, function (value) {
    console.log("List of procrastination sites saved in storage");
  });
}

function getList(callback) {
  console.log("Getting list of procrastination sites from storage");
  storage.get("list", (data) => callback(data.list));
}

function setUID(uid) {
  storage.set({ uid: uid }, function (value) {
    console.log("User ID saved in storage");
  });
}

function getUID(callback) {
  storage.get("uid", (data) => callback(data.uid));
}

function updateSiteTime(siteName, timeSpent) {
  storage.set({ [siteName]: timeSpent }, function (value) {
    console.log(`Time spent on ${siteName} updated to ${timeSpent}`);
  });
}

function getSiteTime(siteName, callback) {
  storage.get(sitename, (data) => callback(data[siteName]));
}

function getSiteTimeList(sites, callback) {
  let list = sites.map((site) => getSiteTime(site, (data) => data));
  callback(list);
}

function getLearningSites(callback) {
  storage.get("learningSites", (data) => callback(data.learningSites));
}

function setLearningSites(list) {
  storage.set({ learningSites: list });
}

function getRedirectionSite(callback) {
  storage.get("redirectionSite", (data) => callback(data.redirectionSite));
}

function setRedirectionSite(siteName) {
  storage.set({ redirectionSite: siteName });
}

export default {
  setList,
  getList,
  setUID,
  getUID,
  updateSiteTime,
  getSiteTime,
  getSiteTimeList,
  getRedirectionSite,
  setRedirectionSite,
  setLearningSites,
  getLearningSites,
};