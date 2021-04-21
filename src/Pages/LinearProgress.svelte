<script>
  /* Wow. This file really needs to be refactored. */
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";

  export let learningTime
  export let bonusTime
  export let percentRemaining;
  $: {
    if (percentRemaining > 0) {
      progress.set(learningTime/100, { duration: 0});
    }
  }

  const progress = tweened(percentRemaining, {
    easing: linear,
    duration: 1000
  });


</script>

<progress value={$progress} />
<p>Extra {bonusTime / 1000} seconds spent learning</p>

<style>
  progress {
    display: block;
    width: 100%;
  }
</style>
