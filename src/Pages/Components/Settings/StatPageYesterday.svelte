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
    let yesterdayStats = [
    {
      icon: faClock,
      value: data.yesterday.sessionData.learningDuration,
      text: "Time Spent Learning:",
    },
    {
      icon: faClock,
      value: data.yesterday.sessionData.procrastinationDuration,
      text: "Time spend procrastinating:",
    },
    {
      icon: faCheckCircle,
      value: data.yesterday.completedCount,
      text: "Completed Learning Sessions:",
    },
    {
      icon: faSkull,
      value: data.yesterday.skipCount,
      text: "Emergency Skips:",
    },
    {
      icon: faSkull,
      value: data.yesterday.snoozeCount,
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