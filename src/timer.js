import storage from "./util/storage";
import badge from "./badge";
import { parseTimerDown } from "./util/utilities";

let earnedTime = 0;
let learningTimeRemaining = 0;
let rewardTimeRemaining = 0;

let bonusTimeIntervalRef;
let learningTimeCountdownRef;
let learningTimeOutRef;
let rewardTimeCountdownRef;
let redirectionTimeoutRef;

//When redirecting to learning site
async function startLearningSession() {
  if (bonusTimeIntervalRef) stopBonusTime();
  if (learningTimeCountdownRef) clearInterval(learningTimeCountdownRef);
  badge.setBusy();
  const time = await storage.timeSettings.learningTime.get();
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

function decrementLearningTime() {
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
}

// When redirecting to origin site
async function startProcrastinationSession(callback, rewardTime) {
  stopLearningSession();
  stopBonusTime();
  earnedTime = 0;
  rewardTimeRemaining = rewardTime;
  rewardTimeCountdownRef = setInterval(decrementRewardTime, 1000);
  redirectionTimeoutRef = setTimeout(
    () => stopProcrastinationSession(callback),
    rewardTime
  );
}

function decrementRewardTime() {
  rewardTimeRemaining -= 1000;
}

function stopBonusTime() {
  clearInterval(bonusTimeIntervalRef);
  bonusTimeIntervalRef = undefined;
}

function stopProcrastinationSession(callback) {
  clearInterval(rewardTimeCountdownRef);
  rewardTimeCountdownRef = undefined;
  storage.shouldRedirect.set(true);
  callback();
}

function killAiki() {
  clearTimeout(redirectionTimeoutRef);
  clearInterval(rewardTimeCountdownRef);
  stopBonusTime();
  rewardTimeCountdownRef = undefined;
  storage.shouldRedirect.set(true);
  rewardTimeRemaining = 0;
  earnedTime = -1;
  learningTimeRemaining = -1;
}

function getTime() {
  return {
    earnedTime: earnedTime,
    learningTimeRemaining: learningTimeRemaining,
    rewardTimeRemaining: rewardTimeRemaining,
  };
}

export default {
  startLearningSession,
  startProcrastinationSession,
  stopLearningSession,
  stopBonusTime,
  stopProcrastinationSession,
  getTime,
  killAiki,
};
