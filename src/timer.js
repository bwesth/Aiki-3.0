import storage from './util/storage';

async function startLearningSession() {
    const time = await storage.getRedirectionTime();
    setTimeout(rewardCountdown, time);
}

async function rewardCountdown() {
    const time = await storage.getRewardTime();
    setTimeout(toggleRedirection, time);
}

export default {
    startLearningSession
}