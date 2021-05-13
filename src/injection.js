import browser from "webextension-polyfill";
import { ProcrastinationWarning } from "./content/ProcrastinationWarning";
import { LearningContent } from "./content/LearningContent";
import { participantResource } from "./util/constants";

/* Listener for messages from background script. */
browser.runtime.onMessage.addListener((request) => {
  if (request.action === "display: snooze") {
    return renderProcrastinationContent(request.url);
  } else if (request.action === "display: encouragement") {
    return renderLearningContent(request.countdown, request.shouldShowWelcome);
  } else if (request.action === "kill aiki") {
    return new Promise((resolve) => {
      timer.stop();
      resolve({ continue: false, endInjection: true, snooze: false });
    });
  } else if (request.action === "removeCloseListener") {
    removeCloseListener();
    return new Promise((resolve) => {
      resolve({
        continue: false,
        endInjection: false,
        snooze: false,
        confirmed: true,
      });
    });
  }
});

function addCloseListener() {
  console.log("addCloseListener");
  window.addEventListener("beforeunload", closeListener);
}

function removeCloseListener() {
  console.log("removeCloseListener");
  window.removeEventListener("beforeunload", closeListener);
}

function closeListener(e) {
  if (location.host.includes(participantResource.name)) {
    console.log(e);
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = "";
  }
}

/* This object contains countdown functionality including 
  functions to hasten and slow the countdown progress.
  If it reaches zero, it will initial redirection and change window
  location to a learning site URL as recieved from background script 
  It is passed to the svelte content function app */
let timer = {
  time: 5000,
  interval: undefined,
  slowed: false,
  start: function (resolve, url) {
    timer.interval = setInterval(() => {
      if (timer.slowed) {
        timer.time -= 20;
      } else {
        timer.time -= 100;
      }
      if (timer.time <= 0) {
        timer.stop();
        resolve({ msg: "Auto resolve", snooze: false });
        location.href = url;
      }
    }, 100);
  },
  stop: function () {
    if (timer.interval) clearInterval(timer.interval);
    timer.interval = undefined;
    timer.time = 5000;
    removeOverlay();
  },
  slow: function () {
    timer.slowed = true;
  },
  hasten: function () {
    timer.slowed = false;
  },
};

/**
 * @function
 * @description Removes the aiki interception overlay
 * by searching for DOM elements with the name "aiki-overlay" and calling remove() on it/them.  */
function removeOverlay() {
  try {
    const element = document.getElementById("aiki-overlay");
    element.remove();
  } catch (error) {
    // console.log(error);
  }
}

function renderProcrastinationContent(url) {
  return new Promise((resolve) => {
    /**
     * @function
     * @description removes the interception pre-redirection step entirely.
     * Timers are stopped, and a message is returned to background script with "removeWarning = true".
     * This function is called by the injected svelte content, and therefore passed to the app function.
     * Lastly the location of this window will be changed to the learning resource URL as recieved from the background script.*/
    function snooze() {
      timer.stop();
      timer.time = 5000;
      resolve({ msg: "Clicked", snooze: true });
      removeOverlay();
    }

    ProcrastinationWarning(snooze, timer, browser, resolve, url);
  });
}

function renderLearningContent(countdown, shouldShowWelcome) {
  return new Promise((resolve) => {
    addCloseListener();
    function gotoOrigin(source) {
      removeCloseListener();
      resolve({
        continue: true,
        endInjection: false,
        source: source,
        uri: location.href,
      });
    }

    function endInjection() {
      resolve({ continue: false, endInjection: true });
    }

    LearningContent(
      countdown,
      shouldShowWelcome,
      gotoOrigin,
      endInjection,
      browser
    );
  });
}
