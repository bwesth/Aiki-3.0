<!-- 
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  // Functional and module imports
  import storage from "../../../util/storage";
  import { parseTime } from "../../../util/utilities";
  import TimeSelector from "./TimeSelector.svelte";

  // Component imports
  import Container from "./Container.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";

  //These arrays are for the seconds display
  let hoursArray = Array.from({ length: 23 }, (_, i) => i + 1); //Generates an array with values from 1->23
  let minutesArray = Array.from({ length: 59 }, (_, i) => i + 1); //Generates an array with values from 1->59
  let minutesArray2 = Array.from({ length: 60 }, (_, i) => i); //Generates an array
  let secondsArray = [0, 15, 30, 45];
  let firstLabels = ["Minutes", "Seconds", "Min/Sec"];
  let secondLabels = ["Hours", "Minutes", "Hr/Min"];

  let learningTime = storage.timeSettings.learningTime.get();
  let rewardTime = storage.timeSettings.rewardTime.get();
  let activeTimeFrom = storage.activeTime.from.get();
  let activeTimeTo = storage.activeTime.to.get();

  // async function fetchStorage() {
  // const data = await storage.timeSettings.getAll();
  // learningTime = parseTime.toHuman(data.learningTime);
  // rewardTime = parseTime.toHuman(data.rewardTime);
  // activeTimeFrom = await storage.activeTime.from.get();
  // activeTimeTo = await storage.activeTime.to.get();
  // }

  async function shouldDisableTo(hours) {
    const threshholdTime = await activeTimeFrom;
    const threshhold = threshholdTime.hrs * 60 + threshholdTime.min;
    console.log("threshhold: ", threshhold);
    console.log("hours: ", hours);
    const target = hours * 60 + threshholdTime.min;
    console.log("target: ", target);
    if (target > threshhold) {
      console.log(target, "is greater than", threshhold);
      console.log(hours, "Not disabled");
      return false;
    } else {
      console.log(target, "is less than", threshhold);
      console.log(hours, "Disabled");
      return true;
    }
  }

  /**
   * @description holds callbacks to each time setting function.
   * selecting changeSettings.learningTime will set learningTime in storage to
   * the learningTime value currently stored in this component (incl conversion).
   * Additionally the ratio is updated.   */
  const changeSettings = {
    learningTime: (values) => {
      // learningTime[target.id] = parseInt(target.value);
      console.log("Learning time: ", values);
      storage.timeSettings.learningTime.set({ min: values[0], sec: values[1] });
    },
    rewardTime: (values) => {
      console.log("Reward time: ", values);
      // rewardTime[target.id] = parseInt(target.value);
      storage.timeSettings.rewardTime.set({ min: values[0], sec: values[1] });
    },
    activeFrom: (values) => {
      // activeTimeFrom[target.id] = parseInt(target.value);
      storage.activeTime.from.set({ hrs: values[0], min: values[1] });
    },
    activeTo: (values) => {
      // activeTimeTo[target.id] = parseInt(target.value);
      storage.activeTime.to.set({ hrs: values[0], min: values[1] });
    },
  };

  // fetchStorage();
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
  {#await learningTime}
    <p>Loading...</p>
  {:then data}
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
          values={[data.min, data.sec]}
          onChange={changeSettings.learningTime}
          ids={["min", "sec"]}
        />
      </div>
    </div>
  {/await}

  {#await rewardTime}
    <p>Loading...</p>
  {:then data}
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
          values={[data.min, data.sec]}
          onChange={changeSettings.rewardTime}
          ids={["min", "sec"]}
        />
      </div>
    </div>
  {/await}

  <hr />
  <h5>Set Operating Hours:</h5>
  <hr />
  <p>
    Choose the window of time you would like Aiki to normally be on during the
    day (for example: ON during your working hours, OFF when you're at home.)
  </p>
  {#await activeTimeFrom}
    <p>Loading...</p>
  {:then data}
    <div class="row">
      <div class="col-sm">
        <p>Aiki will turn ON at this time:</p>
      </div>
      <div class="col-sm" />
      <div class="col-sm">
        <TimeSelector
          firstValues={hoursArray}
          secondValues={minutesArray2}
          labels={secondLabels}
          values={[data.hrs, data.min]}
          onChange={changeSettings.activeFrom}
          ids={["hrs", "min"]}
        />
      </div>
    </div>
  {/await}

  {#await activeTimeTo}
    <p>Loading...</p>
  {:then data}
    <div class="row">
      <div class="col-sm">
        <p>Aiki will turn OFF at this time:</p>
      </div>
      <div class="col-sm" />
      <div class="col-sm">
        <TimeSelector
          firstValues={hoursArray}
          secondValues={minutesArray2}
          labels={secondLabels}
          values={[data.hrs, data.min]}
          onChange={changeSettings.activeTo}
          ids={["hrs", "min"]}
          shouldDisable={shouldDisableTo}
        />
      </div>
    </div>
  {/await}

  <hr />
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
