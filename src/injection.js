import browser from "webextension-polyfill";
import { ProcrastinationWarning } from "./content/ProcrastinationWarning";
import { LearningContent } from "./content/LearningContent";

/* Listener for messages from background script. */
browser.runtime.onMessage.addListener((request) => {
  if (request.action === "display: snooze") {
    return renderProcrastinationContent(request.url);
  } else if (request.action === "display: encouragement") {
    return renderLearningContent(request.countdown, request.shouldShowWelcome);
  }
});

function renderProcrastinationContent(url) {
  return new Promise((resolve, reject) => {
    /* This object contains countdown functionality including 
  functions to hasten and slow the countdown progress.
  If it reaches zero, it will initial redirection and change window
  location to a learning site URL as recieved from background script 
  It is passed to the svelte content function app */
    let timer = {
      time: 5000,
      interval: undefined,
      slowed: false,
      print: function () {},
      start: function () {
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

    /**
     * @function
     * @description Removes the aiki interception overlay
     * by searching for DOM elements with the name "aiki-overlay" and calling remove() on it/them.  */
    function removeOverlay() {
      const element = document.getElementById("aiki-overlay");
      element.remove();
    }

    ProcrastinationWarning(snooze, timer, browser);
  });
}

function renderLearningContent(countdown, shouldShowWelcome) {
  return new Promise((resolve) => {
    function gotoOrigin() {
      resolve({ continue: true, endInjection: false });
    }

    function endInjection() {
      resolve({ continue: false, endInjection: true });
    }

    LearningContent(countdown - 500, shouldShowWelcome, gotoOrigin, endInjection, browser);
  });
}
