import browser from "webextension-polyfill";

  //Controls the badge that appears on the extension icon in the toolbar.
  //Mostly just wrapper functions to make them a little more palatable.
  function setText(value) {
    browser.browserAction.setBadgeText({text: `${value}`});
  }

  //Adjusts badge colour according to state.
  function setBusy() {
    browser.browserAction.setBadgeBackgroundColor({color:'limegreen'});
  }

  function setDone() {
    browser.browserAction.setBadgeBackgroundColor({color:'deepskyblue'});
  }

  //Mainly for readability.
  function remove() {
    browser.browserAction.setBadgeText({text:''});
  }

  export default {
    setText, setBusy, setDone, remove
  }
  
