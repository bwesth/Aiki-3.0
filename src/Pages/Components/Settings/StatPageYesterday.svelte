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
    <p>Pie chart will go here! WIP due 10/05/2021</p>
    <!-- <Chart /> -->
</div>
  
  
<style>
    p{
        text-align: center;
        padding: 20px;
        font-weight: 700;
    }
</style>