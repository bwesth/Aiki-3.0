<!-- This component is rendered as a block on the settings page for users to select their chosen learning platforms.-->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from "../../../util/storage";
  import Fa from "svelte-fa";
  import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
  // let selected;
  // storage.getRedirectionSite((data) => (selected = data));
</script>

<SettingsContainer headline="Learning Site">
  <h5>Your Python Learning Platform:</h5>
  <hr />

  <p>www.codecademy.org</p>

  <h5>Set Learning Time:</h5>
  <hr />
  <p>
    Choose the amount of time you want to spend learning, and how much time you
    are rewarded for doing so.
  </p>
  <div class="d-inline-flex p-2">
    <p>Time spent learning:</p>
  </div>
  <div class="d-inline-flex p-2">
    <div class="input-group input-group-sm mb-3">
      <input
        type="text"
        class="form-control"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
      />
      <div class="input-group-append">
        <span class="input-group-text" id="inputGroup-sizing-sm"
          ><Fa icon={faHourglassHalf} /> Seconds</span
        >
      </div>
    </div>
  </div>
  <hr />
  <div class="d-inline-flex p-2">
    <p>Time you get on your procrastination sites in exchange:</p>
  </div>
  <div class="d-inline-flex p-2">
    <div class="input-group input-group-sm mb-3">
      <input
        type="text"
        class="form-control"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
      />
      <div class="input-group-append">
        <span class="input-group-text" id="inputGroup-sizing-sm"
          ><Fa icon={faHourglassHalf} /> Seconds</span
        >
      </div>
    </div>
  </div>
</SettingsContainer>

<style>
</style>
