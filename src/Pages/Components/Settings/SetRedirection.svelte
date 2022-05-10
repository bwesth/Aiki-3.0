<!-- 
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  // Functional and module imports
  import { participantResource } from "../../../util/constants";

  // Component imports
  import Container from "./Container.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import OperatingHoursSettings from "./OperatingHoursSettings.svelte";
  import TimeSettings from "./TimeSettings.svelte";

</script>

<Container headline="Redirection Settings">
  <h5>Your Python Learning Platform:</h5>
  <hr />
  <div class="container">
    <a href="https://{participantResource.host}"
      ><button
        type="button"
        class="btn btn-dark"
        data-tooltip="Go to your learning platform!"
        >{participantResource.host}</button
      ></a
    >
  </div>
  <hr />
  <TimeSettings />
  <hr />
  <OperatingHoursSettings />

  <hr />
  <h5>Other Settings:</h5>
  <hr />
  <div>
    <div class="row">
      <div class="col-sm">Pick a theme:</div>
      <div class="col-sm" />
      <div class="col-sm center">
        <ThemeSelector />
      </div>
    </div>
  </div>
</Container>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

  .center{
    display: flex;
    justify-content: center;
  }

  .btn-dark {
    display: flex;
  }

  h5 {
    font-family: var(--fontHeaders);
  }

  hr {
    background-color: var(--hrColor);
  }
</style>
