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

<h5>Your Statistics:</h5>
<hr />
<p>Here's a small collection of statistics on how you use Aiki.</p>
<div class="section">
  {#each stats as statItem}
    <StatBlock {...statItem} />
  {/each}
</div>

<style>
  h5 {
    font-family: var(--fontHeaders);
  }

  p {
    font-family: var(--fontContent);
    font-size: var(--fontSizeSettings);
  }

  hr {
    background-color: var(--hrColor);
  }

  .section {
    display: flex;
    flex-direction: column;
  }
</style>
