<!-- 
  Button used in the Popup to access the settings menu from the popup.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  /* Functional and module imports */
  import browser from "webextension-polyfill";
  import Fa from "svelte-fa";
  import { faCog } from "@fortawesome/free-solid-svg-icons";

  /**
   * @async
   * @function
   * @description Opens a new tab in browser with settings page and selects it */
  async function openSettingsPage() {
    const extRef = await browser.management.getSelf();
    browser.tabs.create({
      active: true,
      url: extRef.optionsUrl,
    });
  }
</script>

<div class="container">
  <h6 class="item">Settings:</h6>
  <button
    type="default"
    class="btn btn-primary item"
    data-tooltip="Open the settings page"
    on:click={openSettingsPage}><Fa icon={faCog} /> Settings</button
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
