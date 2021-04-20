<script>
  /* Wow. This file really needs to be refactored. */
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";

  export let learningTime = 0;
  export let timeRemaining = 0;
  export let bonusTime = 0;
  $: percentRemaining = 0;
  $: {
    percentRemaining = timeRemaining > 0 ? (timeRemaining / learningTime) : 0;
    if (percentRemaining > 0) {
      console.log(percentRemaining);
      progress.set(percentRemaining, { duration: 0});
      progress.set(0, { duration: timeRemaining });
    }
  }

  console.log("Remaining: ", timeRemaining, "bonus: ", bonusTime);

  const progress = tweened(0, {
    easing: linear,

  });

  handleTimers();

  /* Conditional is redundant here, same effect without.. Or not? wtf? */
  function handleTimers() {
    console.log(percentRemaining);
    if (timeRemaining === 0) {
      initBonusTime();
    } else {
      setTimeout(initBonusTime, timeRemaining);
    }
  }

  // Maybe redundant to make a function for this
  function initBonusTime() {
    setInterval(() => (bonusTime += 1000), 1000);
  }

  //   const bonus = tweened(0, {
  //     easing: linear,
  //     duration: timeRemaining,
  //   });

  //   bonus.set(1)
</script>

<progress value={$progress} />
<!-- <progress value={$bonus} /> -->
<p>Extra {bonusTime / 1000} seconds spent learning</p>

<style>
  progress {
    display: block;
    width: 100%;
  }
</style>
