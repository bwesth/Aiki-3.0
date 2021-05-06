<script>
  // Component imports
  import Chart from "./Chart.svelte";
  //Accepts a data object passed down from statistics.svelte
  export let data;

  //Getting all variables from data to pipe into the graph.
  // let skips = data.skipCount;
  // let completed = data.completedCount;
  // let snoozes = data.snoozeCount;
  // let procTime = data.sessionData.procrastinationDuration;
  // let learnTime = data.sessionData.learningDuration;

  // let todayStats = [learnTime, procTime, completed, skips, snoozes];

  let todayStats = [1,1,1,1,1];
</script>

<div>
  <Chart {todayStats} />
</div>

<style>
</style>
