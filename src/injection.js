import browser from "webextension-polyfill";
import { app } from "./content/bundle";

// Listener for messages from background script.
browser.runtime.onMessage.addListener((request) => {
  return new Promise((resolve, reject) => {
    console.log(request);
    console.log(request.action);
    app(removeInfowarning);

    let timeoutRef = setTimeout(() => {
      resolve({ msg: "Auto resolve", removeWarning: false });
      location.href = request.url;
    }, 5000);

    function removeInfowarning() {
      clearTimeout(timeoutRef);
      resolve({ msg: "Clicked", removeWarning: true });
      location.href = request.url;
    }
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
