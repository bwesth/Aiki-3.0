<script>
  // Functional and module imports
  import {
    faClock,
    faCheckCircle,
    faSkull,
  } from "@fortawesome/free-solid-svg-icons";

  // Component imports
  import Chart from "./Chart.svelte";
  //Accepts a data object passed down from statistics.svelte
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

<div>
  <Chart {yesterdayStats} />
</div>

<style>
</style>
