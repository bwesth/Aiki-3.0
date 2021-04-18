<script>
  /* Wow. This really needs to be refactored. */
  import { tweened } from "svelte/motion";
  import { linear } from "svelte/easing";

  export let timeRemaining = 0;
  export let bonusTime = 0;

  console.log("Remaining: ", timeRemaining, "bonus: ", bonusTime);

  const progress = tweened(1, {
    easing: linear,
    duration: timeRemaining,
  });

  progress.set(0, { duration: timeRemaining });
  handleTimers();

  /* Conditional is redundant here, same effect without */
  function handleTimers() {
    if (timeRemaining === 0) {
      initBonusTime();
    } else {
      setTimeout(initBonusTime, timeRemaining);
    }
  }

  // Maybe redundant to make a function for this
  function initBonusTime() {
    setInterval(() => bonusTime += 1000, 1000);
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
