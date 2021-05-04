<!-- 
  The main container for the statistics panel in the settings window.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  // Functional and module imports
  import storage from "../../../util/storage";

  // Component imports
  import StatPageToday from "./StatPageToday.svelte";
  import StatPageHistory from "./StatPageHistory.svelte";
  import Container from "./Container.svelte";

  let selected = StatPageToday;

  let statistics = storage.stats.getAll();
  console.log(statistics);
</script>

<Container headline="Statistics">
  <div class="buttons">
    <button on:click={() => (selected = StatPageToday)}>Today</button><button
      on:click={() => (selected = StatPageHistory)}>History</button
    >
  </div>
  {#await statistics}
    <h1>Loading...</h1>
  {:then data}
    <svelte:component this={selected} {data} />
    <!-- <h1>Finished...</h1> -->
  {/await}
</Container>

<style>
  .buttons {
    display: flex;
    widows: 100%;
    justify-content: space-evenly;
  }
</style>
