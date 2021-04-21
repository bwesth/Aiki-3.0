<!-- 

  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  /* Wow. This file really needs to be refactored. */
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";

  export let bonusTime
  export let percentRemaining;
  $: {
    if (percentRemaining >= 0) {
      progress.set(percentRemaining, { duration: 1000});
    }
  }

  const progress = tweened(percentRemaining, {
    easing: linear,
    duration: 0
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