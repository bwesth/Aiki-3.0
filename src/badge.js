import browser from "webextension-polyfill";
  //Functions to control the badge that appears on the extension icon in the chrome toolbar.
 
  /**
  * @description Adds text to the badge.
  * @param { String | number } value Should be less than 4 characters long.  */
  function setText(value) {
    browser.browserAction.setBadgeText({text: `${value}`});
  }

  /**
  * @description Changes the background colour of the badge to green.  */
  function setBusy() {
    browser.browserAction.setBadgeBackgroundColor({color:'limegreen'});
  }

  /**
  * @description Changes the background colour of the badge to blue.  */
  function setDone() {
    browser.browserAction.setBadgeBackgroundColor({color:'deepskyblue'});
  }

  /**
  * @description Removes the badge from the icon entirely.  */
  function remove() {
    browser.browserAction.setBadgeText({text: ''});
  }

  export default {
    setText, setBusy, setDone, remove
  }
  
