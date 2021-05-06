<!-- 
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import Container from "./Container.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import storage from "../../../util/storage";
  import Fa from "svelte-fa";
  import {
    faHourglassHalf,
  } from "@fortawesome/free-solid-svg-icons";

  $: learningTime = 0;
  $: rewardTime = 0;


  async function fetchStorage() {
    const data = await storage.timeSettings.getAll();
    learningTime = data.learningTime / 1000;
    rewardTime = data.rewardTime / 1000;
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


  fetchStorage();
</script>

<Container headline="Redirection Settings">
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
      <div class="col-sm">Pick a theme:</div>
      <div class="col-sm" />
      <div class="col-sm">
        <!-- This has its own component to try and compartmentalize this functionality. -->
        <ThemeSelector />
      </div>
    </div>
  </div>
</Container>

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
