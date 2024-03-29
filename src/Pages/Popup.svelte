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

  let timeValues = new Promise((resolve) => {});

  function sync(res) {
    timeValues = new Promise((resolve) => {
      resolve(res);
    });
  }
  port.onMessage.addListener(function (msg) {
    sync(msg);
  });
  try {
    port.postMessage("get: timer");
  } catch (error) {
    console.error(error);
  }

  let updateIntervalRef = setInterval(() => {
    try {
      port.postMessage("get: timer");
    } catch (error) {
      console.error(error);
    }
  }, 1000);

  async function setup() {
    origin = await storage.origin.get();
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
    try {
      port.postMessage("goto: origin: " + type);
      origin = {};
      // port.postMessage("get: timer");
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  setup();
</script>

<main>
  <Header />
  <SettingsButton />
  <hr />
  <ToggleRedirection {port} />
  <hr />
  {#await timeValues}
    LOADING
  {:then values}
    {#if siteName !== ""}
      {#if values.learningTimeRemaining > 0}
        <LearningTimeLeft
          learningTimeRemaining={values.learningTimeRemaining}
        />
        <hr />
        <div class="container">
          <SkipButton {gotoOrigin} />
        </div>
        <hr />
      {:else}
        <ExtraLearningTime bonusTime={values.bonusTime} />
        <hr />
        <div class="container">
          <ContinueButton {gotoOrigin} />
        </div>
        <hr />
      {/if}
    {:else}
      <ProcTimeLeft rewardTimeRemaining={values.rewardTimeRemaining} />
      <hr />
    {/if}
  {/await}
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
