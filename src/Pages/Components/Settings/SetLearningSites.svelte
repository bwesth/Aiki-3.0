<!-- 

  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from "../../../util/storage";
  import Fa from "svelte-fa";
  import { setTheme, getTheme, drawDarkMode, drawLightMode, drawBlueMode, drawZeeguuMode } from "../../../util/themes"
  import {
    faHourglassHalf,
    faPowerOff,
    faMoon,
    faSun,
    faCrow,
    faBookReader
  } from "@fortawesome/free-solid-svg-icons";

  $: learningTime = 0;
  $: rewardTime = 0;

  let warningOption = false;
  let theme = "light";

  async function fetchStorage() {
    const data = await storage.timeSettings.getAll();
    learningTime = data.learningTime / 1000;
    rewardTime = data.rewardTime / 1000;
    warningOption = await storage.warningOption.get();
    theme = await getTheme();
  }

  /**
   * @description holds callbacks to each time setting function.
   * selecting changeSettings.learningTime will set learningTime in storage to
   * the learningTime value currently stored in this component (incl conversion).
   * Additionally the ratio is updated.
   */
  const changeSettings = {
    learningTime: () => {
      storage.timeSettings.learningTime.set(learningTime * 1000);
      storage.timeSettings.rewardRatio.set(rewardTime / learningTime);
    },
    rewardTime: () => {
      storage.timeSettings.rewardTime.set(rewardTime * 1000);
      storage.timeSettings.rewardRatio.set(rewardTime / learningTime);
    },
  };

  function toggleWarningOption() {
    storage.warningOption.toggle();
    warningOption = !warningOption;
  }

  function changeTheme(input) {
    switch (input) {
      case "light" :
      theme = "light";
      drawLightMode();
      setTheme(input);
      break;

      case "dark" :
      theme = "dark";
      drawDarkMode();
      setTheme(input);
      break;

      case "blue" :
      theme = "blue";
      drawBlueMode();
      setTheme(input);
      break;

      case "zeeguu" :
      theme = "zeeguu";
      drawZeeguuMode();
      setTheme(input);
      break;
    }
  }

  fetchStorage();
</script>

<SettingsContainer headline="Redirection Settings">
  <h5>Your Python Learning Platform:</h5>
  <hr />
  <div class="container">
    <a href="https://www.codecademy.com"
      ><button type="button" class="btn btn-dark">www.codecademy.com</button></a
    >
  </div>
  <h5>Set Learning Time:</h5>
  <hr />
  <p>
    Choose the amount of time you want to spend learning, and how much time you
    are rewarded for doing so.
  </p>

  <div>
    <div class="row">
      <div class="col-sm">
        <p>Time spent learning:</p>
        <p>Time you get on your procrastination sites in exchange:</p>
      </div>
      <div class="col-sm" />
      <div class="col-sm">
        <div class="input-group input-group-sm mb-3">
          <input
            bind:value={learningTime}
            on:change={changeSettings.learningTime}
            type="number"
            class="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
          <div class="input-group-append">
            <span class="input-group-text" id="inputGroup-sizing-sm"
              ><Fa icon={faHourglassHalf} />&nbsp;seconds</span
            >
          </div>
        </div>

        <div class="input-group input-group-sm mb-3">
          <input
            bind:value={rewardTime}
            on:change={changeSettings.rewardTime}
            type="number"
            class="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
          <div class="input-group-append">
            <span class="input-group-text" id="inputGroup-sizing-sm"
              ><Fa icon={faHourglassHalf} />&nbsp;seconds</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <h5>Other Settings:</h5>
  <hr />
  <div>
    <div class="row">
      <div class="col-sm">Toggle countdown before redirection:</div>
      <div class="col-sm" />
      <div class="col-sm">
        <button
          type="default"
          class="btn {warningOption ? 'btn-success' : 'btn-danger'} item"
          on:click={toggleWarningOption}
          ><Fa icon={faPowerOff} /> {warningOption ? "On" : "Off"}</button
        >
      </div>
    </div>
    <div class="row">
      <div class="col-sm">Pick a theme:</div>
      <div class="col-sm" />
      <div class="col-sm">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Themes
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              type="button"
              class="dropdown-item btn btn-light item"
              disabled={theme === "light"? true : false}
              on:click={()=>changeTheme("light")}><Fa icon={faSun} /> Light</button
            >
            <button
              type="button"
              class="dropdown-item btn btn-dark item"
              disabled={theme === "dark"? true : false}
              on:click={()=>changeTheme("dark")}><Fa icon={faMoon} /> Dark</button
            >
            <button
              type="button"
              class="dropdown-item btn btn-info item"
              disabled={theme === "blue"? true : false}
              on:click={()=>changeTheme("blue")}><Fa icon={faCrow} /> Blue</button
            >
            <button
              type="button"
              class="dropdown-item btn btn-warning item"
              disabled={theme === "zeeguu"? true : false}
              on:click={()=>changeTheme("zeeguu")}><Fa icon={faBookReader} /> Zeeguu</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</SettingsContainer>

<style>
  .container {
    text-align: center;
    padding: 15px;
  }

  h5 {
    font-family: var(--fontHeaders);
  }

  p {
    font-family: var(--fontContent);
    font-size: var(--fontSizeSettings);
  }

  hr {
    background-color: var(--hrColor);
  }
</style>
