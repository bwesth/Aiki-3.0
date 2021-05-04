<script>
  // Functional and module imports
  import {
    faClock,
    faCheckCircle,
    faSkull,
  } from "@fortawesome/free-solid-svg-icons";

  // Component imports
  import StatBlock from "./StatBlock.svelte";

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

<div class="section">
  {#each stats as statItem}
    <StatBlock {...statItem} />
  {/each}
</div>

<style>
  .section {
    display: flex;
    flex-direction: column;
  }
</style>
