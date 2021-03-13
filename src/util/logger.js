import firebase from "./firebase";

export function logProcrastinationEvent(details) {
  console.log("Procrastination event logging");
  const entry = details;
  entry.date = makeDate();
  firebase.addProcrastinationEvent(details);
}

export function logLearningEvent(details) {
  console.log("Learning event logging");

  const entry = details;
  entry.date = makeDate();
  firebase.addLearningEvent(details);
}

export function logConfigEvent(details) {
  console.log("Config event logging");

  const entry = details;
  entry.date = makeDate();
  firebase.addConfigLog(entry);
}

function makeDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date();
  return {
    date: date.toLocaleDateString("en-US", options),
    milliseconds: date.getMilliseconds(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    timestamp: date.getTime(),
    hours: date.getHours(),
  };
}
