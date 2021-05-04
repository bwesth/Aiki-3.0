<!-- 
  The main container for the statistics panel in the settings window.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  // Functional and module imports
  import storage from "../../../util/storage";

  // Component imports
  import StatPageToday from "./StatPageToday.svelte";
  import StatPageYesterday from "./StatPageYesterday.svelte";
  import StatPageHistory from "./StatPageHistory.svelte";
  import Container from "./Container.svelte";

  let selected = StatPageToday;

  let statistics = storage.stats.getAll();
  console.log(statistics);
</script>

<Container headline="Statistics">
  <h5>Your Statistics:</h5>
  <hr />
  <p>Here's a small collection of statistics on how you use Aiki.</p>
  {#await statistics}
    <h1>Loading...</h1>
  {:then data}
    <svelte:component this={selected} {data} />
  {/await}
  <div class="buttons">
    <button type="button" class="btn btn-info"
      on:click={() => (selected = StatPageToday)}>Today</button>
    <button type="button" class="btn btn-info"
      on:click={() => (selected = StatPageYesterday)}>Yesterday</button
    >
    <button type="button" class="btn btn-info"
      on:click={() => (selected = StatPageHistory)}>All Time</button
    >
  </div>
</Container>

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

  .btn {
    margin: 10px;
  }

  .buttons {
    display: flex;
    widows: 100%;
    justify-content: center;
  }
</style>
