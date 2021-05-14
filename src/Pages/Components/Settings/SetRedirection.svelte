<!-- 
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  // Functional and module imports
  import storage from "../../../util/storage";
  import { makeDate } from "../../../util/utilities";
  import firebase from "../../../util/firebase";
  import { participantResource } from "../../../util/constants";

  // Component imports
  import Container from "./Container.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import TimeSelector from "./TimeSelector.svelte";
  import OperatingHoursSettings from "./OperatingHoursSettings.svelte";

  export let user = "";

  //These arrays are for the time selections
  let hoursArray = Array.from({ length: 25 }, (_, i) => i); //Generates an array with values from 1->23
  let minutesArray = Array.from({ length: 60 }, (_, i) => i); //Generates an array with values from 1->59
  let quarterIncrArray = [0, 15, 30, 45];
  let firstLabels = ["Minutes", "Seconds", "Min/Sec"];
  let secondLabels = ["Hours", "Minutes", "Hr/Min"];

  let timeSettings = storage.timeSettings.getAll();
  let operatingHours = storage.operatingHours.getAll();
  // let operatingHoursFrom = storage.operatingHours.from.get();
  // let operatingHoursTo = storage.operatingHours.to.get();

  /**
   * @description holds callbacks to each time setting function.
   * selecting changeSettings.learningTime will set learningTime in storage to
   * the learningTime value currently stored in this component (incl conversion).
   * Additionally the ratio is updated.   */
  const changeSettings = {
    learningTime: ([min, sec]) => {
      const learningTime = { min: min, sec: sec };
      console.log(learningTime);
      storage.timeSettings.learningTime.set(learningTime);
      firebase.addLog(
        {
          user: user,
          event: "User changed learning time in settings",
          value: learningTime,
          date: makeDate(),
        },
        "config"
      );
    },
    rewardTime: ([min, sec]) => {
      const rewardTime = { min: min, sec: sec };
      console.log(rewardTime);
      storage.timeSettings.rewardTime.set(rewardTime);
      firebase.addLog(
        {
          user: user,
          event: "User changed reward time in settings",
          value: rewardTime,
          date: makeDate(),
        },
        "config"
      );
    },
    // activeFrom: ([hrs, min]) => {
    //   const operatingHoursFrom = { hrs: hrs, min: min };
    //   storage.operatingHours.from.set(operatingHoursFrom);
    //   firebase.addLog(
    //     {
    //       user: user,
    //       event: "User changed operating hours in settings",
    //       operatingHoursFrom: operatingHoursFrom,
    //       date: makeDate(),
    //     },
    //     "config"
    //   );
    // },
    // activeTo: ([hrs, min]) => {
    //   const operatingHoursTo = { hrs: hrs, min: min };
    //   storage.operatingHours.to.set(operatingHoursTo);
    //   firebase.addLog(
    //     {
    //       user: user,
    //       event: "User changed operating hours in settings",
    //       operatingHoursTo: operatingHoursTo,
    //       date: makeDate(),
    //     },
    //     "config"
    //   );
    // },
  };
</script>

<Container headline="Redirection Settings">
  <h5>Your Python Learning Platform:</h5>
  <hr />
  <div class="container">
    <a href="https://{participantResource.host}"
      ><button
        type="button"
        class="btn btn-dark"
        data-tooltip="Go to your learning platform!"
        >{participantResource.host}</button
      ></a
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
      {#await timeSettings}
        LOADING...
      {:then { learningTime }}
        <TimeSelector
          firstValues={minutesArray}
          secondValues={quarterIncrArray}
          labels={firstLabels}
          values={[learningTime.min, learningTime.sec]}
          onChange={changeSettings.learningTime}
          ids={["min", "sec"]}
        />
      {/await}
    </div>
  </div>

  <div class="row">
    <div class="col-sm">
      <p>Time you get on your procrastination sites in exchange:</p>
    </div>
    <div class="col-sm" />
    <div class="col-sm">
      {#await timeSettings}
        LOADING...
      {:then { rewardTime }}
        <TimeSelector
          firstValues={minutesArray}
          secondValues={quarterIncrArray}
          labels={firstLabels}
          values={[rewardTime.min, rewardTime.sec]}
          onChange={changeSettings.rewardTime}
          ids={["min", "sec"]}
        />
      {/await}
    </div>
  </div>

  <hr />
  <OperatingHoursSettings {user} />

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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

  .btn-dark {
    display: flex;
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
