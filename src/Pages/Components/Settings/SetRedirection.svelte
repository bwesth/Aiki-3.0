<!-- 
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  // Functional and module imports
  import storage from "../../../util/storage";
  import { parseTime, makeDate } from "../../../util/utilities";
  import firebase from "../../../util/firebase";
  import { participantResource } from "../../../util/constants";

  // Component imports
  import Container from "./Container.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import TimeSelector from "./TimeSelector.svelte";

  export let user = "";

  //These arrays are for the seconds display
  let hoursArray = Array.from({ length: 25 }, (_, i) => i); //Generates an array with values from 1->23
  let minutesArray = Array.from({ length: 59 }, (_, i) => i + 1); //Generates an array with values from 1->59
  let quarterIncrArray = [0, 15, 30, 45];
  let firstLabels = ["Minutes", "Seconds", "Min/Sec"];
  let secondLabels = ["Hours", "Minutes", "Hr/Min"];

  let learningTime = { min: 1, sec: 30 };
  let rewardTime = { min: 1, sec: 30 };
  let activeTimeFrom = { hrs: 8, min: 0 };
  let activeTimeTo = { hrs: 22, min: 0 };

  async function fetchStorage() {
    const data = await storage.timeSettings.getAll();
    learningTime = parseTime.toHuman(data.learningTime);
    rewardTime = parseTime.toHuman(data.rewardTime);
    activeTimeFrom = await storage.activeTime.from.get();
    activeTimeTo = await storage.activeTime.to.get();
  }

  function shouldDisableTo(hours) {
    // console.log(value)
    const threshhold = activeTimeFrom.hrs * 60 + activeTimeFrom.min;
    if (hours * 60 + activeTimeTo.min > threshhold) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * @description holds callbacks to each time setting function.
   * selecting changeSettings.learningTime will set learningTime in storage to
   * the learningTime value currently stored in this component (incl conversion).
   * Additionally the ratio is updated.   */
  const changeSettings = {
    learningTime: ({ target }) => {
      learningTime[target.id] = parseInt(target.value);
      storage.timeSettings.learningTime.set(parseTime.toSystem(learningTime));
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
    rewardTime: ({ target }) => {
      rewardTime[target.id] = parseInt(target.value);
      storage.timeSettings.rewardTime.set(parseTime.toSystem(rewardTime));
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
    activeFrom: ({ target }) => {
      activeTimeFrom[target.id] = parseInt(target.value);
      storage.activeTime.from.set(activeTimeFrom);
      firebase.addLog(
        {
          user: user,
          event: "User changed operating hours in settings",
          activeFrom: activeTimeFrom,
          activeto: activeTimeTo,
          date: makeDate(),
        },
        "config"
      );
    },
    activeTo: ({ target }) => {
      activeTimeTo[target.id] = parseInt(target.value);
      storage.activeTime.to.set(activeTimeTo);
      firebase.addLog(
        {
          user: user,
          event: "User changed operating hours in settings",
          activeFrom: activeTimeFrom,
          activeto: activeTimeTo,
          date: makeDate(),
        },
        "config"
      );
    },
  };

  fetchStorage();
</script>

<Container headline="Redirection Settings">
  <h5>Your Python Learning Platform:</h5>
  <hr />
  <div class="container">
    <a href="https://{participantResource.host}"
      ><button
        type="button"
        class="btn btn-dark"
        data-tooltip="Takes you to your learning platform!"
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
      <TimeSelector
        firstValues={minutesArray}
        secondValues={quarterIncrArray}
        labels={firstLabels}
        values={[learningTime.min, learningTime.sec]}
        onChange={changeSettings.learningTime}
        ids={["min", "sec"]}
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
        secondValues={quarterIncrArray}
        labels={firstLabels}
        values={[rewardTime.min, rewardTime.sec]}
        onChange={changeSettings.rewardTime}
        ids={["min", "sec"]}
      />
    </div>
  </div>

  <hr />
  <h5>Set Operating Hours:</h5>
  <hr />
  <p>
    Choose the window of time you would like Aiki to be ON during the
    day.
  </p>

  <div class="row">
    <div class="col-sm">
      <p>Aiki will turn <strong>ON</strong> at this time:</p>
    </div>
    <div class="col-sm" />
    <div class="col-sm">
      <TimeSelector
        firstValues={hoursArray}
        secondValues={quarterIncrArray}
        labels={secondLabels}
        values={[activeTimeFrom.hrs, activeTimeFrom.min]}
        onChange={changeSettings.activeFrom}
        ids={["hrs", "min"]}
      />
    </div>
  </div>

  <div class="row">
    <div class="col-sm">
      <p>Aiki will turn <strong>OFF</strong> at this time:</p>
    </div>
    <div class="col-sm" />
    <div class="col-sm">
      <TimeSelector
        firstValues={hoursArray}
        secondValues={quarterIncrArray}
        labels={secondLabels}
        values={[activeTimeTo.hrs, activeTimeTo.min]}
        onChange={changeSettings.activeTo}
        ids={["hrs", "min"]}
      />
    </div>
  </div>

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
