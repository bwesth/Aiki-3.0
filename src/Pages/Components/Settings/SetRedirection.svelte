<!-- 
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  // Functional and module imports
  // import { participantResource } from "../../../util/constants";

  // Component imports
  import Container from "./Container.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import OperatingHoursSettings from "./OperatingHoursSettings.svelte";
  import TimeSettings from "./TimeSettings.svelte";
  import Fa from "svelte-fa";
  import { faSave } from "@fortawesome/free-solid-svg-icons";

  export let user = "";
  let learningUri = storage.learningUri.get();
  let inputValue = "";

  async function onSubmit() {
    if (inputValue === "") {
      return;
    }
    if (!inputValue.includes("https://")) {
      inputValue = `https://${inputValue}`; //TODO: Check if it should be http instead? Most websites enforce https anyway, but not all have security in place and thus https will not work. Maybe ask Mircea.
    }
    storage.learningUri.set(inputValue);
    inputValue = "";
    learningUri = storage.learningUri.get();
  }
</script>

<Container headline="Redirection Settings">
  <h5>Your Target Platform:</h5>
  <hr />
  <!-- new -->
  <div class="container">
    <div class="change-site-setting">
      <h4>Current learning URI:</h4>
      <a href={learningUri}
        ><button
          type="button"
          class="btn btn-dark"
          data-tooltip="Go to your learning platform!"
          >{learningUri}</button
        ></a
      >
      <form on:submit|preventDefault={onSubmit}>
        <div data-tooltip="Change your learning resource.">
          <div class="input-group mb-3">
            <input
              bind:value={inputValue}
              id="addItem"
              type="text"
              class="form-control"
              placeholder="Enter website here..."
              aria-label=""
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button id="add-button" class="btn btn-primary" type="submit"
                ><Fa icon={faSave} /> Change Site</button
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- old -->
  <!-- <div class="container">
    <a href="https://{participantResource.host}"
      ><button
        type="button"
        class="btn btn-dark"
        data-tooltip="Go to your learning platform!"
        >{participantResource.host}</button
      ></a
    >
  </div> -->

  <hr />
  <TimeSettings {user} />
  <hr />
  <OperatingHoursSettings {user} />

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

  .center {
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
