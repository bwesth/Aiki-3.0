import { renderApp } from "./content.js";

// Listener for messages from background script.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(location.host);
  console.log(request);
  console.log(request.action);
  switch (request.action) {
    case "returnURL":
      console.log("sending host to background: " + location.host);
      sendResponse({ host: location.host });
      break;
    case "redirection":
      redirectRequest();
      break;
  }

  function redirectRequest() {
    if (document.getElementsByClassName("svelte-1tky8bj").length > 0) {
      console.log("Already rendered");
    } else {
      console.log("Rendering")
      renderApp();
    }
    sendResponse({ message: "Redirection successful" });
  }
  return true;
});
