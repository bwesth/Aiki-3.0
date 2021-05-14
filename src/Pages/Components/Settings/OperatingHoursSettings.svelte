<!-- 
  TODO: Description goes here
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import storage from "../../../util/storage";
  import OperatingHoursSelector from "./OperatingHoursSelector.svelte";
  let operatingHours = storage.operatingHours.getAll();
  function update() {
    console.log("STUFF");
    operatingHours = storage.operatingHours.getAll();
  }

  export let user;
</script>

<h5>Set Operating Hours:</h5>
<hr />
<p>Choose the window of time you would like Aiki to be ON during the day.</p>
{#await operatingHours}
  LOADING...
{:then settings}
  <OperatingHoursSelector {update} {settings} {user} />
{/await}

<style>
  p {
    padding: 0;
    margin-bottom: 1rem;
    font-family: var(--fontContent);
    font-size: var(--fontSizeSettings);
  }

  hr {
    background-color: var(--hrColor);
  }

  h5 {
    font-family: var(--fontHeaders);
  }
</style>
