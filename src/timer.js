import storage from "./util/storage";

let earnedTime = 0;
let learningTimeRemaining = 0;
let bonusTimeIntervalRef;
let learningTimeCountdownRef;

//When redirecting to learning site
async function startLearningSession() {
  if (bonusTimeIntervalRef) stopBonusTime();
  const time = await storage.timeSettings.learningTime.get();
  console.log("Starting learning session for seconds: ", time);
  learningTimeRemaining = time;
  learningTimeCountdownRef = setInterval(() => (learningTimeRemaining -= 1000), 1000);
  setTimeout(startBonusTime, time);
}

function startBonusTime() {
  if (bonusTimeIntervalRef) stopBonusTime();
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
  stopBonusTime();
  const rewardTime = await calculateRewardTime();
  earnedTime = 0;
  setTimeout(() => stopPropagationSession(callback), rewardTime);
}

function stopBonusTime() {
  clearInterval(bonusTimeIntervalRef);
  bonusTimeIntervalRef = undefined;
}

function stopPropagationSession(callback) {
  storage.shouldRedirect.set(true);
  callback();
}

async function calculateRewardTime() {
  const rewardRatio = await storage.timeSettings.rewardRatio.get();
  const learningTime = await storage.timeSettings.learningTime.get();
  let rewardTime = rewardRatio * (earnedTime * 1000 + learningTime);
  return Math.floor(rewardTime);
}

function getTime() {
  return { earnedTime: earnedTime, learningTimeRemaining: learningTimeRemaining };
}

export default {
  startLearningSession,
  startProcrastinationSession,
  getTime
};
