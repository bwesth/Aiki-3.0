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
  let stats = [
    {
      icon: faClock,
      value: data.sessionData.learningDuration,
      text: "Time Spent Learning:",
    },
    {
      icon: faClock,
      value: data.sessionData.procrastinationDuration,
      text: "Time spend procrastinating:",
    },
    {
      icon: faCheckCircle,
      value: data.completedCount,
      text: "Completed Learning Sessions:",
    },
    { icon: faSkull, value: data.skipCount, text: "Emergency Skips:" },
    {
      icon: faSkull,
      value: data.snoozeCount,
      text: "Times you clicked snooze:",
    },
  ];
</script>

<div class="chartContainer">
  <Chart />
</div>


<style>
  /* .chartContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  } */
</style>

