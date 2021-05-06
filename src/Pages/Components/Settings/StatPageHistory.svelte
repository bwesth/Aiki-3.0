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

<div>
  <Chart {historyStats}/>
</div>

<style>

</style>
