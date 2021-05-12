<script>
  // Component imports
  import Chart from "./Chart.svelte";
  import Fa from "svelte-fa";
  import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
  //Accepts a data object and a type string passed down from statistics.svelte
  export let data;
  export let type;

  let skips, completed, snoozes, procTime, learnTime, title;

  //Getting all variables from data to pipe into the graph, depending on the type.
  function getChartData() {
    switch (type) {
      case "today":
        skips = data.skipCount;
        completed = data.completedCount;
        snoozes = data.snoozeCount;
        procTime = data.sessionData.procrastinationDuration;
        learnTime = data.sessionData.learningDuration;
        title = type;
        break;
      case "yesterday":
        skips = data.yesterday.skipCount;
        completed = data.yesterday.completedCount;
        snoozes = data.yesterday.snoozeCount;
        procTime = data.yesterday.sessionData.procrastinationDuration;
        learnTime = data.yesterday.sessionData.learningDuration;
        title = type;
        break;
      case "history":
        skips = data.history.skipCount;
        completed = data.history.completedCount;
        snoozes = data.history.snoozeCount;
        procTime = data.history.sessionData.procrastinationDuration;
        learnTime = data.history.sessionData.learningDuration;
        title = "in all time";
        break;
      default:
        skips = 0;
        completed = 0;
        snoozes = 0;
        procTime = 0;
        learnTime = 0;
        title = "";
    }
  }

  getChartData();

  learnTime = Math.round(learnTime);
  procTime = Math.round(procTime);

  let stats = [learnTime, procTime, completed, skips, snoozes, title];
  let noStats = false;

  if (learnTime === 0 && procTime === 0) {
    noStats = true;
  }
</script>

{#if noStats}
  <div class="wrapper">
    <h5>
      <Fa icon={faExclamationTriangle} />
      &nbsp;&nbsp;No stats for this time period (yet)!&nbsp;&nbsp;
      <Fa icon={faExclamationTriangle} />
    </h5>
  </div>
{:else}
  <div>
    <Chart {stats} />
  </div>
{/if}

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }

  h5 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--fontSizeSettings);
    color: var(--textColor);
  }
</style>
