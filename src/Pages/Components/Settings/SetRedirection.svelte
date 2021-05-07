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
  //These arrays are for the seconds display
  let hoursArray = Array.from({ length: 23 }, (_, i) => i + 1);
  let minutesArray = Array.from({ length: 59 }, (_, i) => i + 1);
  let secondsArray = [0, 15, 30, 45];
  let firstLabels = ["Minutes", "Seconds", "Min/Sec"];
  let secondLabels = ["Hours", "Minutes", "Hr/Min"];

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
  <hr />
  <h5>Set Learning Time:</h5>
  <hr />
  <p>
    Choose the amount of time you want to spend learning, and how much time you
    are rewarded for doing so.
  </p>

  <div class="row">
    <div class="col-sm">
      <p>Time spent learning:</p>
    </div>
    <div class="col-sm" />
    <div class="col-sm">
      <TimeSelector
        firstValues={minutesArray}
        secondValues={secondsArray}
        labels={firstLabels}
      />
    </div>
  </div>

  <div class="row">
    <div class="col-sm">
      <p>Time you get on your procrastination sites in exchange:</p>
    </div>
    <div class="col-sm" />
    <div class="col-sm">
      <TimeSelector
        firstValues={minutesArray}
        secondValues={secondsArray}
        labels={firstLabels}
      />
    </div>
  </div>

  <hr />
  <h5>Set Operating Hours:</h5>
  <hr />
  <p>
    Choose the window of time you would like Aiki to normally be on during the
    day (for example: ON during your working hours, OFF when you're at home.)
  </p>

  <div class="row">
    <div class="col-sm">
      <p>Aiki will turn ON at this time:</p>
    </div>
    <div class="col-sm" />
    <div class="col-sm">
      <TimeSelector
        firstValues={hoursArray}
        secondValues={secondsArray}
        labels={secondLabels}
      />
    </div>
  </div>

  <div class="row">
    <div class="col-sm">
      <p>Aiki will turn OFF at this time:</p>
    </div>
    <div class="col-sm" />
    <div class="col-sm">
      <TimeSelector
        firstValues={hoursArray}
        secondValues={secondsArray}
        labels={secondLabels}
      />
    </div>
  </div>

  <hr/>
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
</style>
