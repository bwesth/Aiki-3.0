// Listener for messages from background script.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "returnURL":
      sendResponse({ host: location.host });
      break;
    case "redirection":
      redirectRequest();
      break;
  }

  function redirectRequest() {
    if (document.getElementsByClassName("svelte-1tky8bj").length > 0) {
    } else {
      renderApp();
    }
    sendResponse({ message: "Redirection successful" });
  }
  return true;
});
