// Getting this to work means cross-browser support.
import browser from "webextension-polyfill";

import { AikiOverlay, Link } from "./HTMLInjection/componentBucket";
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
    // console.log(request);
    // console.log(sender);
    renderApp();
    sendResponse({ message: "Redirection successful" });
    // let aikiOverlay = AikiOverlay();
    // let link = Link();
    // aikiOverlay.appendChild(link);
    // document.body.appendChild(aikiOverlay);
  }
  return true;
});

// function setStyle(element, style) {
//   element.style[style.property] = style.value;
// }

// function applyStyles(element, styles) {
//   styles.forEach((style) => setStyle(element, style));
// }

// function createOverlayElement(child) {
//   let ele = document.createElement("div");
//   ele.id = "aikiOverlay";
//   applyStyles(ele, overlayStyle);
//   ele.appendChild(child);
//   document.body.appendChild(ele);
// }

// function createInnerElement(type, content) {
//   let ele = document.createElement(type);
//   ele.innerHTML = content;
//   return ele;
// }

// window.addEventListener("scroll", (event) => {
//   if (event !== undefined) {
//     // console.log(event.path[1].scrollY);
//     console.log(event);
//   }
// });
