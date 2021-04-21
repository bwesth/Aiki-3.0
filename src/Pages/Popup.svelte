<script>
  /* Functional and module imports */
  import { parseUrl } from "../util/utilities";
  import storage from "../util/storage";
  import browser from "webextension-polyfill";
  import badge from "../badge";

  /* Components import */
  import SettingsButton from "./Components/popup/SettingsButton.svelte";
  import LinearProgress from "./Components/Popup/LinearProgress.svelte";
  import ToggleRedirection from "./Components/Popup/ToggleRedirection.svelte";
  import ContinueButton from "./Components/Popup/ContinueButton.svelte";
  import SkipButton from "./Components/Popup/SkipButton.svelte";

  const port = browser.extension.connect({
    name: "Popup Communication",
  });

  let siteName = "";
  let origin = {};

  let timeRemaining = -1;
  let bonusTime = -1;
  let learningTime = -1;
  let intervalRef;
  $: canContinue = timeRemaining <= 0 ? true : false;

  async function setup() {
    getTimer();
    origin = await storage.origin.get();
    learningTime = await storage.timeSettings.learningTime.get();
    handleTimers();
  }

  $: if (origin) {
    if (origin.url) {
      siteName = parseUrl(origin.url).name;
    }
  }

  /**
   * @function
   * @description Sends a message to the background script for intepretation.
   * Background script will initiate a tab update on the tab that triggered a redirection,
   * restoring the origin uri.
   */
  function gotoOrigin() {
    badge.remove();
    port.postMessage("goto: origin");
  }

  // Is also in <Progress>, trying something. Seems to be working.
  async function getTimer() {
    port.postMessage("get: timer");
    port.onMessage.addListener(function (msg) {
      timeRemaining = msg.learningTimeRemaining;
      bonusTime = msg.earnedTime * 1000;
    });
  }

  function handleTimers() {
    if (timeRemaining === 0) {
      initBonusTime();
    } else {
      intervalRef = setInterval(() => {
        timeRemaining -= 1000;
      }, 1000);
      setTimeout(initBonusTime, timeRemaining);
    }
  }

  // Maybe redundant to make a function for this
  function initBonusTime() {
    clearInterval(intervalRef);
    setInterval(() => (bonusTime += 1000), 1000);
  }

  setup();
</script>

<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->
<main>
  <div class="popup">
    <div class="container" style="margin-top: 10px">
      <img src="images/aikido.png" class="icon item" alt="Aiki logo" />
      <h5 class="header item">Aiki 3.0</h5>
    </div>
    <hr />
    <SettingsButton />
    <hr />
    <ToggleRedirection />
    <hr />
    {#if siteName !== ""}
      <LinearProgress
        {bonusTime}
        percentRemaining={ timeRemaining / learningTime }
      />
      <hr />
      <div class="container">
        {#if canContinue}
          <ContinueButton {siteName} {gotoOrigin} />
        {:else}
          <SkipButton {gotoOrigin} />
        {/if}
      </div>
      <hr />
    {/if}
  </div>
</main>

<!-- Using a mix of flexbox and bootstap to get the styling done. -->
<style>
  .container {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
  }

  .item {
    margin: auto auto;
  }

  .popup {
    padding: 5px;
  }

  .header {
    display: inline;
  }

  .icon {
    height: 27px;
    display: inline;
    padding-right: 10px;
  }

  hr {
    height: 1px;
    border-width: 0;
    color: gray;
    background-color: gray;
    width: 90%;
    margin: 10px 10px;
  }

  main {
    background-color: #282c34;
    color: white;
    text-align: center;
    height: fit-content;
    width: 250px;
  }
</style>
