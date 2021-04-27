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

async function getLearningTime() {
  const result = await storage.get("learningTime");
  return result.learningTime;
}

function setLearningTime(time) {
  storage.set({ learningTime: time });
}

async function getRewardRatio() {
  const result = await storage.get("rewardRatio");
  return result.rewardRatio;
}

function setRewardRatio(ratio) {
  storage.set({ rewardRatio: ratio });
}

async function getRewardTime() {
  const result = await storage.get("rewardTime");
  return result.rewardTime;
}

function setRewardTime(time) {
  storage.set({ rewardTime: time });
}

async function getUserTimes() {
  const result = await storage.get([
    "rewardTime",
    "rewardRatio",
    "learningTime",
  ]);
  return result;
}

async function setShouldRedirect(boolean) {
  console.log("Should redirect set to: ", boolean);
  storage.set({ shouldRedirect: boolean });
}

async function getShouldRedirect() {
  const result = await storage.get("shouldRedirect");
  return result.shouldRedirect;
}

async function setWarningOption(state){
  storage.set({ warningOption: state})
}

async function getWarningOption() {
  const result = await storage.get("warningOption");
  return result.warningOption;
}

async function toggleWarningOption() {
  storage.get("warningOption").then((data) => {
    storage.set({ warningOption: !data.toggled });
  });
}

export default {
  timeSettings: {
    getAll: getUserTimes,
    learningTime: { get: getLearningTime, set: setLearningTime },
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
  warningOption: { get: getWarningOption, set: setWarningOption, toggle: toggleWarningOption },
};
