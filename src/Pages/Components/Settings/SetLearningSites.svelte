<!-- 

  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from "../../../util/storage";
  import Fa from "svelte-fa";
  import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

  $: learningTime = 0;
  $: rewardTime = 0;
  let infoWarning = false;

  async function fetchStorage() {
    const data = await storage.timeSettings.getAll();
    learningTime = data.learningTime / 1000;
    rewardTime = data.rewardTime / 1000;
    infoWarning = await storage.warningOption.get();
    console.log(infoWarning);
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

  function updateWarningSetting() {
    storage.warningOption.set(infoWarning);
    console.log(infoWarning);
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
  <hr />
  <div>
    <div class="row">
      <div class="col-sm">
        <p>Miscellaneous:</p>
      </div>
      <div class="col-sm" />
      <div class="col-sm" >
        <input type="checkbox" bind:checked={infoWarning} on:change={updateWarningSetting} />
        <label for="infoWarningToggle" class="form-check-label"
          >Info Warning</label
        >
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
    font-family: "Roboto", sans-serif;
  }

  p {
    font-family: "Lato", sans-serif;
    font-size: 16px;
  }
</style>
