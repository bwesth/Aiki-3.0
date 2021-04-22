/**
 * 
 * @param {string} site 
 * @returns An object containing the host and name of the given site.
 */
export function parseUrl(site) {
  let host = site.includes("http") ? site.split("/")[2] : site.split("/")[0];
  let name = host.includes("www") ? host.split(".")[1] : host.split(".")[0];
  return { host: host, name: name };
}

/**
 * 
 * @returns 
 */
export function makeDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date();
  return {
    dateString: date.toLocaleDateString("en-US", options),
    milliseconds: date.getMilliseconds(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    timestamp: date.getTime(),
    hours: date.getHours(),
  };
}

/**
 * Parses a given value of milliseconds into a human-readable string.
 * @param {number} milliseconds 
 * @returns A string value floored to the nearest minute. (eg: 1m)
 */
export function parseTimerUp(milliseconds) {
  let seconds = milliseconds/1000;
  if (seconds < 60) {
    return `${seconds}s`
  } else if (seconds >= 60) {
    let minutes = seconds/60;
    minutes = Math.floor(minutes);
    return `${minutes}m`
  }
}

/**
 * Parses a given value of milliseconds into a human-readable string.
 * @param {number} milliseconds 
 * @returns A string value raised to the nearest minute. (eg: 1m)
 */
export function parseTimerDown(milliseconds) {
  let seconds = milliseconds/1000;
  if (seconds <= 30) {
    return `${seconds}s`;
  } else if (seconds >= 31 && seconds <=59) {
    return "1m";
  } else if (seconds >= 60) {
    let minutes = seconds/60;
    minutes = Math.ceil(minutes);
    return `${minutes}m`;
  }
}