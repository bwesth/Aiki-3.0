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
    on:click={openSettingsPage}><Fa icon={faCog} /> Settings</button
  >
</div>

<style>
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