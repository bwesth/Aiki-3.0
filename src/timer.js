import storage from "./util/storage";

let earnedTime = 0;
let intervalRef;

//When redirection to learning site
async function startLearningSession() {
  const time = await storage.getRedirectionTime();
  console.log("Starting learning session for seconds: ", time);
  setTimeout(finishLearningReq, time);
}

function finishLearningReq() {
  startBonusTime();
}

function startBonusTime() {
  intervalRef = setInterval(incrementEarnedTime, 1000);
}

function incrementEarnedTime() {
  earnedTime++;
  console.log("Earned time: ", earnedTime);
}

// When redirection to origin site

function startProcrastinationSession() {
  storage.toggleRedirection();
  stopBonusTime();
  rewardCountdown();
}

function stopBonusTime() {
  clearInterval(intervalRef);
}

async function rewardCountdown() {
  const rewardtime = await storage.getRewardTime();
  console.log("Reward time from storage: ", rewardtime);
  const finalRewardTime = rewardtime + earnedTime * 1000;
  console.log("Calculated final reward time: ", finalRewardTime);
  earnedTime = 0;
  setTimeout(storage.toggleRedirection, finalRewardTime);
}

export default {
  startLearningSession,
  startProcrastinationSession,
};
