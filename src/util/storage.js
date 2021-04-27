import browser from "webextension-polyfill";
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
 * @deprecated
 * @async @function
 * @returns {object} website
 * @description returns the website the user is redirected to upon procrastination interception. */
async function getRedirectionSite() {
  const result = await storage.get("redirectionSite");
  return result.redirectionSite;
}

/**
 /**
 * @deprecated
 * @async @function
 * @param {object} site
 * @param {string} site.name
 * @param {string} site.id
 * @description returns the website the user is redirected to upon procrastination interception. */
function setRedirectionSite(site) {
  storage.set({ redirectionSite: site });
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
 * @deprecated Ratio no longer used
 * @async @function
 * @returns {number} rewardRatio
 * @description returns ratio with which procrastination time awarded is calculated. */
async function getRewardRatio() {
  const result = await storage.get("rewardRatio");
  return result.rewardRatio;
}

/**
 * @deprecated
 * @function
 * @param {number} rewardRatio
 * @description sets the ratio with which the procrastination time awarded is calculated. */
function setRewardRatio(ratio) {
  storage.set({ rewardRatio: ratio });
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
  console.log("Should redirect set to: ", state);
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

/**
 * @async @function
 * @param {Boolean} state
 * @description sets the state of whether procrastination interception 
 * should have a pre-redirection step. If true, the user will see injected 
 * content with a countdown before redirection, this will use the "onCompleted" webNavigation event.
 * If false, the user will be redirected instantly upon procrastination website loading attempt.
 * This will use the "onBeforeRedirect" webNavigation event */
async function setWarningOption(state) {
  storage.set({ warningOption: state });
}

/**
 * @async @function
 * @returns {Boolean} warningOption
 * @description returns the state of whether procrastination interception 
 * should have a pre-redirection step. If true, the user will see injected 
 * content with a countdown before redirection, this will use the "onCompleted" webNavigation event.
 * If false, the user will be redirected instantly upon procrastination website loading attempt.
 * This will use the "onBeforeRedirect" webNavigation event */
async function getWarningOption() {
  const result = await storage.get("warningOption");
  return result.warningOption;
}

/**
 * @async @function
 * @description toggles the state of whether procrastination interception 
 * should have a pre-redirection step. If false it will change to true and vice versa.
 *  If true, the user will see injected content with a countdown before redirection, 
 * this will use the "onCompleted" webNavigation event. If false, the user will be 
 * redirected instantly upon procrastination website loading attempt.
 * This will use the "onBeforeRedirect" webNavigation event */
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
  warningOption: {
    get: getWarningOption,
    set: setWarningOption,
    toggle: toggleWarningOption,
  },
};
