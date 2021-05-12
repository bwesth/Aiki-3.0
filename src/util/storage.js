import browser from "webextension-polyfill";
import { makeDate } from "./utilities";
import { learningSites, participantResource } from "./constants";
const storage = browser.storage.local;

/**
 * @function
 * @description Clears all stored data in browser storage. */
function clearStorage() {
  storage.clear();
}

/**
 * @function
 * @description Inverts the state of the "toggled" variable in storage
 * that determines whether or not a user should be redirected.
 * redirectionToggled is a settings parameter changed by the user. */

function toggleRedirection() {
  storage.get("toggled").then((data) => {
    storage.set({ toggled: !data.toggled });
  });
}

/**
 * @async @function
 * @returns {object} userData that includes a list of procrastination websites as defined by the user, as well as the user ID.
 * @description Returns the user ID and a list of procrastination websites wrapped in an object. */
async function getUserData() {
  const result = await storage.get(["list", "uid"]);
  return result;
}

/**
 * @async @function
 * @returns {Boolean} Determines whether user should be redirected.
 * @description Returns a boolean value indicating whether user should be redirected.
 * redirectionToggled is a settings parameter changed by the user. */
async function getRedirectionToggled() {
  const result = await storage.get("toggled");
  return result.toggled;
}

/**
 * @function
 * @param {object[]} list
 * @param {string} list[].name
 * @param {string} list[].id
 * @description Sets the list of procrastination websites in storage. */
function setList(list) {
  storage.set({ list: list });
}

/**
 * @async @function
 * @returns {object[]} list
 * @description returns the list of procrastination websites from storage.*/
async function getList() {
  const result = await storage.get("list");
  return result.list;
}

/**
 * @function
 * @param {string} uid
 * @description sets the user ID in storage. */
function setUid(uid) {
  storage.set({ uid: uid });
}

/**
 * @async @function
 * @returns {string} User ID
 * @description returns the user ID from storage. */
async function getUid() {
  const result = await storage.get("uid");
  return result.uid;
}

/**
 * @function
 * @param {object} origin
 * @param {string} origin.url
 * @param {number} origin.tabId
 * @description sets the origin tabID and url in storage for later reference.
 * The origin object is tied to the website from which the user was intercepted by Aiki3 */
function setOrigin(origin) {
  storage.set({ origin: origin });
}

/**
 * @async @function
 * @returns {object} origin
 * @description returns the origin tabID and url in storage.
 *  The origin object is tied to the website from which the user was intercepted by Aiki3 */
async function getOrigin() {
  const result = await storage.get("origin");
  return result.origin;
}

/**
 * @function
 * @description removes the origin variable from storage.
 *  The origin object is tied to the website from which the user was intercepted by Aiki3 */
function removeOrigin() {
  storage.remove("origin");
}

function setLearningUri(uri) {
  if (uri) {
    storage.set({ learningUri: uri });
  } else {
    storage.set({ learningUri: participantResource.host });
  }
}

async function getLearningUri() {
  let result = await storage.get("learningUri");
  if (result.learningUri) {
    return result.learningUri;
  } else return `https://${participantResource.host}`
}

// function setLearningUri (uri){
//   storage.set({learningUri: uri});
// }

/**
 * @async @function
 * @returns {number} learningTime
 * @description returns a userdefined amount of miliseconds
 * before they can continue to their origin procrastination website. */
async function getLearningTime() {
  const result = await storage.get("learningTime");
  return result.learningTime;
}

/**
 * @function
 * @param {number} time
 * @description sets the amount of time before a user is allowed to
 * continue to the origin procrastination website. */
function setLearningTime(time) {
  storage.set({ learningTime: time });
}

/**
 * @async @function
 * @returns {number} rewardTime
 * @description returns the userdefined amount of miliseconds the user is allowed to spend on
 * procrastination websites before interception is turned back on. */
async function getRewardTime() {
  const result = await storage.get("rewardTime");
  return result.rewardTime;
}

/**
 * @function
 * @param {number} time
 * @description sets in storage the userdefined amount of miliseconds the user is allowed
 * to spend on procrastination websites before interception is turned back on. */
function setRewardTime(time) {
  storage.set({ rewardTime: time });
}

/**
 * @async @function
 * @returns {object} userTimes
 * @description returns an object containing the time-related
 * values set by the user: rewardTime and learningTime. */
async function getUserTimes() {
  const result = await storage.get(["rewardTime", "learningTime"]);
  return result;
}

/**
 * @description Initializes the time settings in storage upon app installation. */
function userTimeInit() {
  setLearningTime(60000 * 5);
  setRewardTime(60000 * 15);
}

/**
 * @async @function
 * @param {Boolean} state
 * @description sets in storage whether user should be redirected.
 * shouldRedirect is defined by the application when the user has earned
 * procrastination time, and again when this expires. */
async function setShouldRedirect(state) {
  storage.set({ shouldRedirect: state });
}

/**
 * @async @function
 * @returns {Boolean} shouldRedirect
 * @description returns the state of whether user should be redirected.
 * shouldRedirect is defined by the application when the user has earned
 * procrastination time, and again when this expires. */
async function getShouldRedirect() {
  const result = await storage.get("shouldRedirect");
  return result.shouldRedirect;
}

async function storeSession(data) {
  const { sessionData, statsDate } = await storage.get([
    "sessionData",
    "statsDate",
  ]);
  await checkDate(statsDate);
  let newData = sessionData;
  if (
    !newData.hasOwnProperty("procrastinationDuration") ||
    newData.procrastinationDuration === NaN
  ) {
    newData.procrastinationDuration = 0;
  }
  if (
    !newData.hasOwnProperty("learningDuration") ||
    newData.learningDuration === NaN
  ) {
    newData.learningDuration = 0;
  }

  for (const key in data) {
    if (key === participantResource.name) {
      newData.learningDuration += data[key];
    } else if (!["chromeInactive", "chromeActive"].includes(key)) {
      newData[key] = sessionData.hasOwnProperty(key)
        ? sessionData[key] + data[key]
        : data[key];
      newData.procrastinationDuration += data[key];
    }
  }
  storage.set({ sessionData: newData });
}

async function checkDate(statsDate) {
  const date = makeDate().dateString;
  if (statsDate !== date) {
    await overWriteYesterday();
    await storage.set({ snoozeCount: 0 });
    await storage.set({ completedCount: 0 });
    await storage.set({ skipCount: 0 });
    await storage.set({
      sessionData: { procrastinationDuration: 0, learningDuration: 0 },
    });
    await storage.set({ statsDate: date });
  }
}

async function incrSnoozeCount() {
  const { statsDate, snoozeCount } = await storage.get([
    "snoozeCount",
    "statsDate",
  ]);
  await checkDate(statsDate);
  storage.set({ snoozeCount: snoozeCount + 1 });
}

async function incrContinueCount() {
  const { completedCount, statsDate } = await storage.get([
    "completedCount",
    "statsDate",
  ]);
  await checkDate(statsDate);
  storage.set({ completedCount: completedCount + 1 });
}

async function incrSkipCount() {
  const { skipCount, statsDate } = await storage.get([
    "skipCount",
    "statsDate",
  ]);
  await checkDate(statsDate);
  storage.set({ skipCount: skipCount + 1 });
}

async function getAllStats() {
  const result = await storage.get([
    "sessionData",
    "skipCount",
    "completedCount",
    "snoozeCount",
    "yesterday",
    "history",
  ]);
  return result;
}

// async function testStatsFlow() {
//   await storage.set({ statsDate: new Date(2010, 5, 9) });
//   await storeSession({ theguardian: 60, sololearn: 60 });
//   await incrContinueCount();
//   await storage.set({ statsDate: new Date(2010, 5, 10) });
//   await storeSession({ theguardian: 60, sololearn: 60 });
//   await incrContinueCount();
//   await storage.set({ statsDate: new Date(2010, 5, 11) });
//   await storeSession({ theguardian: 60, sololearn: 60 });
//   await incrContinueCount();
// }

// testStatsFlow();

function initializeStats() {
  storage.set({
    sessionData: { procrastinationDuration: 0, learningDuration: 0 },
  });
  storage.set({ skipCount: 0 });
  storage.set({ completedCount: 0 });
  storage.set({ snoozeCount: 0 });
  storage.set({
    history: {
      sessionData: { procrastinationDuration: 0, learningDuration: 0 },
      completedCount: 0,
      skipCount: 0,
      snoozeCount: 0,
    },
  });
  storage.set({
    yesterday: {
      sessionData: { procrastinationDuration: 0, learningDuration: 0 },
      skipCount: 0,
      completedCount: 0,
      snoozeCount: 0,
    },
  });
}

async function overWriteYesterday() {
  await addToHistory();
  const yesterday = await storage.get([
    "sessionData",
    "skipCount",
    "completedCount",
    "snoozeCount",
  ]);
  storage.set({
    yesterday: yesterday,
  });
}

async function addToHistory() {
  let { yesterday, history } = await storage.get(["yesterday", "history"]);
  if (!history.hasOwnProperty("skipCount") || history.skipCount === NaN)
    history.skipCount = 0;
  if (
    !history.hasOwnProperty("completedCount") ||
    history.completedCount === NaN
  )
    history.completedCount = 0;
  if (!history.hasOwnProperty("snoozeCount") || history.snoozeCount === NaN)
    history.snoozeCount = 0;
  if (!history.hasOwnProperty("sessionData")) {
    history.sessionData = { procrastinationDuration: 0, learningDuration: 0 };
  } else if (
    history.sessionData.procrastinationDuration === NaN ||
    history.sessionData.learningDuration === NaN
  ) {
    history.sessionData = { procrastinationDuration: 0, learningDuration: 0 };
  }
  history.skipCount += yesterday.skipCount;
  history.completedCount += yesterday.completedCount;
  history.snoozeCount += yesterday.snoozeCount;
  history.sessionData.procrastinationDuration +=
    yesterday.sessionData.procrastinationDuration;
  history.sessionData.learningDuration +=
    yesterday.sessionData.learningDuration;
  storage.set({ history: history });
}

function setActiveTimeFrom(value) {
  storage.set({ activeFrom: value });
}
async function getActiveTimeFrom() {
  const result = await storage.get("activeFrom");
  return result.activeFrom;
}
function setActiveTimeTo(value) {
  storage.set({ activeTo: value });
}
async function getActiveTimeTo() {
  const result = await storage.get("activeTo");
  return result.activeTo;
}

function activeTimeInit() {
  setActiveTimeFrom({ hrs: 8, min: 0 });
  setActiveTimeTo({ hrs: 21, min: 30 });
}

export default {
  timeSettings: {
    getAll: getUserTimes,
    init: userTimeInit,
    learningTime: { get: getLearningTime, set: setLearningTime },
    rewardTime: { get: getRewardTime, set: setRewardTime },
  },
  shouldRedirect: { get: getShouldRedirect, set: setShouldRedirect },
  clearStorage,
  getUserData,
  origin: { get: getOrigin, set: setOrigin, remove: removeOrigin },
  learningUri: { get: getLearningUri, set: setLearningUri },
  list: { set: setList, get: getList },
  uid: { set: setUid, get: getUid },
  redirection: { toggle: toggleRedirection, get: getRedirectionToggled },
  stats: {
    storeSession: storeSession,
    skip: incrSkipCount,
    continue: incrContinueCount,
    snooze: incrSnoozeCount,
    getAll: getAllStats,
    init: initializeStats,
  },
  activeTime: {
    from: { get: getActiveTimeFrom, set: setActiveTimeFrom },
    to: { get: getActiveTimeTo, set: setActiveTimeTo },
    init: activeTimeInit,
  },
};
