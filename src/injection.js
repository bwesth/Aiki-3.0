// Listener for messages from background script.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  
  console.log(request)
  console.log(request.action)

  // function redirectRequest() {
  //   if (document.getElementsByClassName("svelte-1tky8bj").length > 0) {
  //   } else {
  //     renderApp();
  //   }
  //   sendResponse({ message: "Redirection successful" });
  // }
  // return true;
});
