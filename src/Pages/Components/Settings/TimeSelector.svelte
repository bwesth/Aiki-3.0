<script>
  // Functional and module imports
  import storage from "../../../util/storage";
  import firebase from "../../../util/firebase";
  import { makeDate } from "../../../util/utilities";

  let minuteOptions = Array.from({ length: 60 }, (_, i) => i); //Generates an array with values from 1->59
  let secondsOptions = [0, 15, 30, 45];
  export let settings;
  export let update;
  export let user;

  let { min: learnMin, sec: learnSec } = settings.learningTime;
  let { min: rewardMin, sec: rewardSec } = settings.rewardTime;

  function parseNumberToTime(number) {
    return number < 10 ? `0${number}` : number;
  }

  function setLearningTime() {
    const learningTime = { min: learnMin, sec: learnSec };
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
    update();
  }

  function setRewardTime() {
    const rewardTime = { min: rewardMin, sec: rewardSec };
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
    update();
  }
</script>

<!-- ActiveFrom -->
<div class="row">
  <div class="col-sm">
    <p>Time spent learning:</p>
  </div>
  <div class="col-sm" />
  <div class="col-sm">
    <div class="wrapper">
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        selected={learnMin}
        id="hrs"
        on:change={(e) => {
          learnMin = parseInt(e.target.value);
          if (learnMin === 0 && learnSec < 30) learnSec = 30;
          setLearningTime();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each minuteOptions as value}
          <option selected={value === learnMin} {value}
            >{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p>:</p>
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        selected={learnSec}
        id="min"
        on:change={(e) => {
          learnMin === 0 && parseInt(e.target.value) < 30
            ? (learnSec = 30)
            : (learnSec = parseInt(e.target.value));
          setLearningTime();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each secondsOptions as value}
          <option selected={value === learnSec} {value}
            >{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p><small>{"Min/Sec"}</small></p>
    </div>
  </div>
</div>

<!-- ActiveTo -->
<div class="row">
  <div class="col-sm">
    <p>Time you get on your procrastination sites in exchange:</p>
  </div>
  <div class="col-sm" />
  <div class="col-sm">
    <!-- svelte-ignore a11y-no-onchange -->
    <div class="wrapper">
      <select
        selected={rewardMin}
        id="hrs"
        on:change={(e) => {
          rewardMin = parseInt(e.target.value);
          if (rewardMin === 0 && rewardSec < 30) rewardSec = 30;
          setRewardTime();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each minuteOptions as value}
          <option selected={value === rewardMin} {value}
            >{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p>:</p>
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        selected={rewardSec}
        id="min"
        on:change={(e) => {
          rewardMin === 0 && parseInt(e.target.value) < 30
            ? (rewardSec = 30)
            : (rewardSec = parseInt(e.target.value));
          setRewardTime();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each secondsOptions as value}
          <option selected={value === rewardSec} {value}
            >{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p><small>{"Min/Sec"}</small></p>
    </div>
  </div>
</div>

<style>
  .inline {
    display: inline !important;
    width: 25%;
    margin: 0px 5px 20px 0px;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  p {
    display: inline;
    padding: 0;
    margin: 0px 5px 20px 0px;
    font-family: var(--fontContent);
    font-size: var(--fontSizeSettings);
  }

  select,
  option {
    font-family: var(--fontContent);
    font-size: 0.875rem;
    color: #212121;
  }
</style>
