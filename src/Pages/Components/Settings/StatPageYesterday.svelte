<script>
  // Component imports
  import Chart from "./Chart.svelte";
  //Accepts a data object passed down from statistics.svelte
  export let data;

  //Getting all variables from data to pipe into the graph.
  // let skips = data.yesterday.skipCount;
  // let completed = data.yesterday.completedCount;
  // let snoozes = data.yesterday.snoozeCount;
  // let procTime = data.yesterday.sessionData.procrastinationDuration;
  // let learnTime = data.yesterday.sessionData.learningDuration;

  // let yesterdayStats = [learnTime, procTime, completed, skips, snoozes];

  let yesterdayStats = [1,1,1,1,1];
</script>

<div>
  <Chart {yesterdayStats} />
</div>

<style>
</style>
