<script>
  // Component imports
  import Chart from "./Chart.svelte";
  //Accepts a data object passed down from statistics.svelte
  export let data;

  //Getting all variables from data to pipe into the graph.
  let skips = data.history.skipCount;
  let completed = data.history.completedCount;
  let snoozes = data.history.snoozeCount;
  let procTime = data.history.sessionData.procrastinationDuration;
  let learnTime = data.history.sessionData.learningDuration;

  let historyStats = [learnTime, procTime, completed, skips, snoozes];
</script>

<div>
  <Chart {historyStats} />
</div>

<style>
</style>
