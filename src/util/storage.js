const storage = chrome.storage.sync;

function toggleRedirection() {
  storage.get("toggled", (data) => {
    storage.set({ toggled: !data.toggled });
  });
}

function getRedirectionToggled(callback) {
  storage.get("toggled", (data) => {
    callback(data.toggled);
  });
}

function setList(list) {
  storage.set({ list: list }, function (value) {});
}

function getList(callback) {
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
  toggleRedirection,
  getRedirectionToggled,
};
