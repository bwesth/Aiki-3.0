<!-- TODO: Good example for TID? ThemeSelector is inside SetRedirection, which also is a bad name
  Contains settings for redirection duration, as well as other misc settings such as changing theme.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
 <script>
    // Functional and module imports
    import { participantResource } from "../../../util/constants";
    import Fa from "svelte-fa";
    import { faSave } from "@fortawesome/free-solid-svg-icons";
    import storage from "../../../util/storage";
  
    // Component imports
    import Container from "./Container.svelte";
    import ThemeSelector from "./ThemeSelector.svelte";
    import OperatingHoursSettings from "./OperatingHoursSettings.svelte";
    import TimeSettings from "./TimeSettings.svelte";
  
    // API-realted imports
    import API from "../../../API";
    import { eventNames } from '../../../API/Event'
  
    let learningUri = storage.learningUri.get();
    let inputValue = "";
  
    async function changeValue() {
      if (inputValue === "") {
        return;
      }
      if (!inputValue.includes("https://")) {
        inputValue = `https://${inputValue}`; //TODO: Check if it should be http instead? Most websites enforce https anyway, but not all have security in place and thus https will not work. Maybe ask Mircea. 
      }
      const requestResult = await API.user.setTargetSite(inputValue);
      if (requestResult) {
        const eventDetails = {
          newTarget: inputValue
        }
        API.event.create(eventNames.SetRedirection, eventDetails)
        storage.learningUri.set(inputValue);
        inputValue = "";
        learningUri = storage.learningUri.get();
      }
    }
  </script>
  
  <Container headline="Redirection Settings">
    <h5>Your Learning Platform:</h5>
      <hr />
      <div class="container">
        {#await learningUri}
          LOADING...
        {:then learningResource}
          <div class="change-site-setting">
            <h4>Current learning URI:</h4>
            <a href="{learningResource}"
              ><button
                type="button"
                class="btn btn-dark"
                data-tooltip="Go to your learning platform!"
                >{learningResource}</button
              ></a
            >
            <form on:submit|preventDefault={changeValue}>
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
        {/await}
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
  