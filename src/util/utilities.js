/**
 * @function
 * @param {object} site
 * @param {string} site.name
 * @param {string} site.host
 * @returns {object}
 * @description returns an object containing the host and name of the given site.
 * Example: https://example.com/fragment returns {name: "example", host: "www.example.com"} */
export function parseUrl(site) {
  let host = site.includes("http") ? site.split("/")[2] : site.split("/")[0];
  let name = host.includes("www") ? host.split(".")[1] : host.split(".")[0];
  return { host: host, name: name };
}

/**
 * @function
 * @returns {object} date
 * @description returns a new object containing a string with the date at time of function call,
 * as well as numbers for hours, minutes, seconds and milliseconds, as well as a timestamp for use in
 * Firestore document creation. */
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
 * @function
 * @param {number} milliseconds
 * @returns {string} time
 * @description Parses a given value of milliseconds into a short human-readable string.
 * This function should be used only when counting up.
 * For values greater than or equal to 60 seconds, the string value will be floored
 * to the nearest minute. (eg: 1m). For values lesser than 60 seconds,
 * the string value will be in seconds.
 * For a long string version, use parseTimerUpLong. */
export function parseTimerUp(milliseconds) {
  let seconds = milliseconds / 1000;
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds >= 60) {
    let minutes = seconds / 60;
    minutes = Math.floor(minutes);
    return `${minutes}m`;
  }
}

/**
 * @function
 * @param {number} milliseconds
 * @returns {string} time
 * @description Parses a given value of milliseconds into a long human-readable string.
 * @ This function should be used only when counting up.
 * For values greater than or equal to 60 seconds, the string value will be rounded down
 * to the nearest minute. (eg: 1m). For values lesser than 60 seconds, the string value will be in seconds.
 * For a short string version, use parseTimerUp. */
export function parseTimerUpLong(milliseconds) {
  let seconds = milliseconds / 1000;
  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (seconds >= 60) {
    let minutes = seconds / 60;
    minutes = Math.floor(minutes);
    return `${minutes} minutes`;
  }
}

/**
 * @param {number} milliseconds
 * @returns {string} time
 * @description Parses a given value of milliseconds into a short human-readable string.
 * This function should be used only when counting up.
 * For values greater than 60 seconds, the string value will be rounded up
 * to the nearest minute. (eg: 1m). For values lesser than or equal to 60 seconds,
 * the string value will be in seconds.
 * For a long string version, use parseTimerDownLong. */
export function parseTimerDown(milliseconds) {
  let seconds = milliseconds / 1000;
  if (seconds <= 30) {
    return `${seconds}s`;
  } else if (seconds >= 31 && seconds <= 59) {
    return "1m";
  } else if (seconds >= 60) {
    let minutes = seconds / 60;
    minutes = Math.ceil(minutes);
    return `${minutes}m`;
  }
}

/**
 * @param {number} milliseconds
 * @returns {string} time
 * @description Parses a given value of milliseconds into a short human-readable string.
 * This function should be used only when counting up.
 * For values greater than 60 seconds, the string value will be rounded up
 * to the nearest minute. (eg: 1m). For values lesser than or equal to 60 seconds,
 * the string value will be in seconds.
 * For a short string version, use parseTimerDown. */
export function parseTimerDownLong(milliseconds) {
  let seconds = milliseconds / 1000;
  if (seconds === 0) {
    return "None";
  } else if (seconds <= 60) {
    return `${seconds} seconds`;
  } else if (seconds >= 60) {
    let minutes = seconds / 60;
    minutes = Math.ceil(minutes);
    return `${minutes} minutes`;
  }
}

export const parseTime = {
  toHumanReadableArray: (time) => {
    return [ Math.floor(time / 60 / 1000), (time / 1000) % 60 ];
  },

  toSystem: (time) => {
    return 1000 * (time.min * 60 + time.sec);
  },
};
