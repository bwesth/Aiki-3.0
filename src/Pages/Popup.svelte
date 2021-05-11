<!-- 
  This popup is displayed when the user clicks on the extension icon on the toolbar.
  Used in / Parent components: /src/App.svelte
 -->
<script>
  /* Functional and module imports */
  import { parseUrl } from "../util/utilities";
  import storage from "../util/storage";
  import browser from "webextension-polyfill";

  /* Components import */
  import Header from "./Components/Popup/Header.svelte";
  import SettingsButton from "./Components/Popup/SettingsButton.svelte";
  import ToggleRedirection from "./Components/Popup/ToggleRedirection.svelte";
  import ContinueButton from "./Components/Popup/ContinueButton.svelte";
  import SkipButton from "./Components/Popup/SkipButton.svelte";
  import LearningTimeLeft from "./Components/Popup/LearningTimeLeft.svelte";
  import ProcTimeLeft from "./Components/Popup/ProcTimeLeft.svelte";
  import ExtraLearningTime from "./Components/Popup/ExtraLearningTime.svelte";

  const port = browser.extension.connect({
    name: "Popup Communication",
  });

  let siteName = "";
  let origin = {};
  //Need to calculate this procTimeRemaining somehow...
  let rewardTimeRemaining = -1;
  let learnTimeRemaining = -1;
  let bonusTime = -1;
  let intervalRef;
  let timeoutRef;
  let rewardIntervalRef;

  $: canContinue = learnTimeRemaining <= 0 ? true : false;

  async function setup() {
    await getTimer();
    origin = await storage.origin.get();
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
  function gotoOrigin(type) {
    port.postMessage("goto: origin: " + type);
    origin = {};
    location.reload();
  }

  async function getTimer() {
    return new Promise((resolve) => {
      port.postMessage("get: timer");
      port.onMessage.addListener(async function (msg) {
        learnTimeRemaining = await msg.learningTimeRemaining;
        rewardTimeRemaining = await msg.rewardTimeRemaining;
        bonusTime = (await msg.earnedTime) * 1000;
        resolve();
      });
    });
  }

  function killAiki(){
    clearInterval()
    clearTimeout(timeoutRef)
    clearInterval(rewardIntervalRef)
    rewardTimeRemaining = 0;
  }

  function handleTimers() {
    console.log(rewardTimeRemaining);
    if (learnTimeRemaining === 0) {
      initBonusTime();
    } else {
      intervalRef = setInterval(() => {
        learnTimeRemaining -= 1000;
      }, 1000);
      setTimeout(initBonusTime, learnTimeRemaining);
    }
    if (rewardTimeRemaining > 0) {
      console.log(rewardTimeRemaining);
      rewardIntervalRef = setInterval(() => {
        rewardTimeRemaining -= 1000;
        console.log(rewardTimeRemaining);
      }, 1000);
      timeoutRef = setTimeout(() => clearInterval(rewardIntervalRef), rewardTimeRemaining);
    }
  }

  //Maybe redundant to make a function for this
  function initBonusTime() {
    clearInterval(intervalRef);
    setInterval(() => (bonusTime += 1000), 1000);
  }

  setup();
</script>

<main>
  <Header />
  <SettingsButton />
  <hr />
  <ToggleRedirection {port} {killAiki} />
  <hr />

  {#if siteName !== ""}
    {#if canContinue}
      <ExtraLearningTime {bonusTime} />
      <hr />
      <div class="container">
        <ContinueButton {siteName} {gotoOrigin} />
      </div>
    {:else}
      <LearningTimeLeft {learnTimeRemaining} />
      <hr />
      <div class="container">
        <SkipButton {gotoOrigin} />
      </div>
    {/if}
    <hr />
  {:else}
    <ProcTimeLeft {rewardTimeRemaining} />
    <hr />
  {/if}
</main>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  hr {
    color: var(--hrColor);
    background-color: var(--hrColor);
    height: 1px;
    border-width: 0;
    width: 90%;
    margin: 10px 10px;
  }

  main {
    font-family: var(--fontHeaders);
    background-color: var(--backgroundColorSecondary);
    color: var(--textColor);
    text-align: center;
    height: fit-content;
    width: 220px;
  }
</style>
