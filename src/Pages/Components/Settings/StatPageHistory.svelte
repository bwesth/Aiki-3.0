<script>
  // Component imports
  import Chart from "./Chart.svelte";
  //Accepts a data object passed down from statistics.svelte
  export let data;

  //Getting all variables from data to pipe into the graph.
  let skips = data.skipCount;
  let completed = data.completedCount;
  let snoozes = data.snoozeCount;
  let procTime = data.sessionData.procrastinationDuration;
  let learnTime = data.sessionData.learningDuration;

  let historyStats = [learnTime, procTime, completed, skips, snoozes];
</script>

<div>
  <Chart {historyStats} />
</div>

<style>
</style>
