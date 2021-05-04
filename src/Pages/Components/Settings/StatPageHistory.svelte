<script>
  // Functional and module imports
  import {
    faClock,
    faCheckCircle,
    faSkull,
  } from "@fortawesome/free-solid-svg-icons";

  // Component imports
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
