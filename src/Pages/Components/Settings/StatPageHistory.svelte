<script>
  // Functional and module imports
  import {
    faClock,
    faCheckCircle,
    faSkull,
  } from "@fortawesome/free-solid-svg-icons";

  // Component imports
  import StatBlock from "./StatBlock.svelte";
  import Chart from "./Chart.svelte";
  export let data;

  let historyStats = [
    {
      icon: faClock,
      value: data.history.learningDuration,
      text: "Time Spent Learning:",
    },
    {
      icon: faClock,
      value: data.history.procrastinationDuration,
      text: "Time spend procrastinating:",
    },
    {
      icon: faCheckCircle,
      value: data.history.completedCount,
      text: "Completed Learning Sessions:",
    },
    { icon: faSkull, value: data.history.skipCount, text: "Emergency Skips:" },
    {
      icon: faSkull,
      value: data.history.snoozeCount,
      text: "Times you clicked snooze:",
    },
  ];
</script>

<div class="dataContainers">

  <!-- <div class="section">
    {#each historyStats as statItem}
      <StatBlock {...statItem} />
    {/each}
  </div> -->

  <!-- <div class="section">
    <h4>Yesterday</h4>
    {#each yesterdayStats as statItem}
      <StatBlock {...statItem} />
    {/each}
  </div>
  <div class="section">
    <h4>All Time</h4>
    {#each historyStats as statItem}
      <StatBlock {...statItem} />
    {/each}
  </div> -->
  <!-- Trying out the chart here.... -->
  <div class="chart">
    <Chart />
  </div>
</div>

<style>
  .dataContainers {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  /* .section {
    display: flex;
    flex-direction: column;
  } */
</style>
