<!-- 
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import Container from "./Container.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import storage from "../../../util/storage";
  // import Fa from "svelte-fa";
  // import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

  import TimeSelector from "./TimeSelector.svelte";

  //Generates an array with values from 1->60
  let minutesArray = Array.from({ length: 60 }, (_, i) => i + 1);
  let secondsArray = [0, 15, 30, 45];
  let labels = ["Minutes", "Seconds", "Min/Sec"];

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

  <div class="main">
    <div class="row">
      <div class="col-sm">
        <p>Time spent learning:</p>
      </div>
      <div class="col-sm" />
      <div class="col-sm">
        <TimeSelector firstValues={minutesArray} secondValues={secondsArray} {labels} />
      </div>
    </div>
  </div>
  
  <div class="main">
    <div class="row">
      <div class="col-sm">
        <p>Time you get on your procrastination sites in exchange:</p>
      </div>
      <div class="col-sm" />
      <div class="col-sm">
        <TimeSelector firstValues={minutesArray} secondValues={secondsArray} {labels} />
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

  /* .main {
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  /* .top-row {
    width: 80%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .bottom-row {
    width: 80%;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  } */
</style>
