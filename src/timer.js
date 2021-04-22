import storage from "./util/storage";
import badge from "./badge";
import { parseTimerDown } from "./util/utilities";

let earnedTime = 0;
let learningTimeRemaining = 0;
let bonusTimeIntervalRef;
let learningTimeCountdownRef;
let learningTimeOutRef;

//When redirecting to learning site
async function startLearningSession() {
  if (bonusTimeIntervalRef) stopBonusTime();
  if (learningTimeCountdownRef) clearInterval(learningTimeCountdownRef);
  badge.setBusy();
  const time = await storage.timeSettings.learningTime.get();
  console.log("Starting learning session for seconds: ", time);
  learningTimeRemaining = time;
  badge.setText(parseTimerDown(learningTimeRemaining));
  learningTimeCountdownRef = setInterval(decrementLearningTime, 1000);
  learningTimeOutRef = setTimeout(startBonusTime, time);
}

function stopLearningSession() {
  clearInterval(learningTimeCountdownRef);
  clearTimeout(learningTimeOutRef);
  badge.remove();
}

function decrementLearningTime () {
  learningTimeRemaining -= 1000;
  badge.setText(parseTimerDown(learningTimeRemaining));
}
 
function startBonusTime() {
  if (bonusTimeIntervalRef) stopBonusTime();
  badge.setDone();
  badge.setText("Done");
  clearInterval(learningTimeCountdownRef);
  learningTimeCountdownRef = undefined;
  bonusTimeIntervalRef = setInterval(incrementEarnedTime, 1000);
}

function incrementEarnedTime() {
  earnedTime++;
  console.log("Earned time: ", earnedTime);
}

// When redirecting to origin site
async function startProcrastinationSession(callback) {
  stopLearningSession();
  stopBonusTime();
  const rewardTime = await calculateRewardTime();
  earnedTime = 0;
  setTimeout(() => stopProcrastinationSession(callback), rewardTime);
}

function stopBonusTime() {
  clearInterval(bonusTimeIntervalRef);
  bonusTimeIntervalRef = undefined;
}

function stopProcrastinationSession(callback) {
  storage.shouldRedirect.set(true);
  callback();
}

async function calculateRewardTime() {
  // const rewardRatio = await storage.timeSettings.rewardRatio.get();
  // const learningTime = await storage.timeSettings.learningTime.get();
  const rewardTime = await storage.timeSettings.rewardTime.get();
  // let rewardTime = rewardRatio * (earnedTime * 1000 + learningTime);
  return rewardTime;
}

function getTime() {
  return { earnedTime: earnedTime, learningTimeRemaining: learningTimeRemaining };
}

export default {
  startLearningSession,
  startProcrastinationSession,
  getTime
};
