import browser from "webextension-polyfill";
import { app } from "./content/bundle";

// Listener for messages from background script.
browser.runtime.onMessage.addListener((request) => {
  return new Promise((resolve, reject) => {
    console.log(request);
    console.log(request.action);

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
            resolve({ msg: "Auto resolve", removeWarning: false });
            location.href = request.url;
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

    function removeInfowarning() {
      timer.stop();
      resolve({ msg: "Clicked", removeWarning: true });
      location.href = request.url;
    }

    app(removeInfowarning, timer);
  });

  // function redirectRequest() {
  //   if (document.getElementsByClassName("svelte-1tky8bj").length > 0) {
  //   } else {
  //     renderApp();
  //   }
  //   sendResponse({ message: "Redirection successful" });
  // }
  // return true;
});
