<!-- 
  Button used in the Popup to toggle the redirection functionality on and off.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  /* Functional and module imports */
  import Fa from "svelte-fa";
  import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
  import storage from "../../../util/storage";

  export let port;
  export let killAiki;
  let toggled;

  async function setup() {
    toggled = await storage.redirection.get();
  }

  function toggleRedirection() {
    storage.redirection.toggle();
    toggled = !toggled;
    if (!toggled) {
      port.postMessage("goto: off");
      killAiki();
      location.reload();
    } else {
      port.postMessage("goto: on");
      location.reload();
    }
  }

  setup();
</script>

<div class="container">
  <h6 class="item">Aiki is:</h6>
  <button
    type="default"
    class="btn {toggled ? 'btn-success' : 'btn-danger'} item"
    data-tooltip="Turn Aiki ON or OFF"
    on:click={toggleRedirection}
    ><Fa icon={faPowerOff} /> {toggled ? "On" : "Off"}</button
  >
</div>

<style>
  button {
    font-size: var(--fontSizePopup);
  }

  h6 {
    font-size: var(--fontSizePopup);
    color: var(--textColor);
  }

  .container {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
  }

  .item {
    margin: auto auto;
  }
</style>
