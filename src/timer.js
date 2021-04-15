import storage from "./util/storage";

let earnedTime = 0;
let intervalRef;

//When redirecting to learning site
async function startLearningSession() {
  if (intervalRef) stopBonusTime();
  const time = await storage.getRedirectionTime();
  console.log("Starting learning session for seconds: ", time);
  setTimeout(startBonusTime, time);
}

function startBonusTime() {
  if (intervalRef) stopBonusTime();
  intervalRef = setInterval(incrementEarnedTime, 1000);
}

function incrementEarnedTime() {
  earnedTime++;
  console.log("Earned time: ", earnedTime);
}

// When redirecting to origin site
async function startProcrastinationSession(callback) {
  stopBonusTime();
  const rewardTime = await calculateRewardTime();
  earnedTime = 0;
  console.log("Reward time: ", rewardTime);
  setTimeout(() => stopPropagationSession(callback), rewardTime);
}

function stopBonusTime() {
  clearInterval(intervalRef);
  intervalRef = undefined;
}

function stopPropagationSession(callback) {
  console.log("Stopping procrastination session");
  storage.setShouldRedirect(true);
  callback();
}

async function calculateRewardTime() {
  const rewardRatio = await storage.getRewardRatio();
  const redirectionTime = await storage.getRedirectionTime();
  let rewardTime = rewardRatio * (earnedTime * 1000 + redirectionTime);
  return Math.floor(rewardTime);
}

export default {
  startLearningSession,
  startProcrastinationSession,
};
