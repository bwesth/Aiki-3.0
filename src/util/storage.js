import browser from "webextension-polyfill";
import { makeDate } from "./utilities";
import { learningSites } from "./constants";
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
 * values set by the user: rewardTime and learningTime (and rewardTime(depricated)). */
async function getUserTimes() {
  const result = await storage.get([
    "rewardTime",
    "rewardRatio",
    "learningTime",
  ]);
  return result;
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
  let newData = {};
  for (const key in data) {
    if (!["chromeInactive", "chromeActive"].includes(key)) {
      newData[key] = sessionData.hasOwnProperty(key)
        ? sessionData[key] + data[key]
        : data[key];
    }
    storage.set({ sessionData: newData });
  }
}

async function checkDate(statsDate) {
  const date = makeDate().dateString;
  if (statsDate !== date) {
    overWriteYesterday();
    await storage.set({ snoozeCount: 0 });
    await storage.set({ completedCount: 0 });
    await storage.set({ skipCount: 0 });
    await storage.set({ sessionData: {} });
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
  ]);
  return result;
}

async function overWriteYesterday() {
  const today = await storage.stats.getAll();
  const procSites = await storage.getList();
  let p = 0,
    l = 0;
  for (const key in today.sessionData) {
    if (procSites.includes(key)) {
      p += today.sessionData[key];
    } else if (learningSites.includes(key)) {
      l += today.sessionData[key];
    }
  }
  storage.set({
    yesterday: {
      snoozeCount: today.snoozeCount,
      completedCount: today.completedCount,
      skipCount: today.skipCount,
      procrastinationDuration: p,
      learningDuration: l,
    },
  });
}

export default {
  timeSettings: {
    getAll: getUserTimes,
    learningTime: { get: getLearningTime, set: setLearningTime },
    rewardTime: { get: getRewardTime, set: setRewardTime },
  },
  shouldRedirect: { get: getShouldRedirect, set: setShouldRedirect },
  clearStorage,
  getUserData,
  origin: { get: getOrigin, set: setOrigin, remove: removeOrigin },
  list: { set: setList, get: getList },
  uid: { set: setUid, get: getUid },
  redirection: { toggle: toggleRedirection, get: getRedirectionToggled },
  stats: {
    storeSession: storeSession,
    skip: incrSkipCount,
    continue: incrContinueCount,
    snooze: incrSnoozeCount,
    getAll: getAllStats,
  },
};
