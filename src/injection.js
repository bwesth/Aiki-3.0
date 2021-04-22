import browser from "webextension-polyfill";
import { app } from './content/bundle'

// Listener for messages from background script.
browser.runtime.onMessage.addListener( request => {
  console.log(request)
  console.log(request.action)
  app(click, click2 )
  
  function click(){
    console.log("Injection click", request.url)
    browser.runtime.sendMessage({response: "Hi from content script"});
  }

  function click2(){
    location.href = request.url
  }


  // function redirectRequest() {
    //   if (document.getElementsByClassName("svelte-1tky8bj").length > 0) {
      //   } else {
  //     renderApp();
  //   }
  //   sendResponse({ message: "Redirection successful" });
  // }
  // return true;
});

