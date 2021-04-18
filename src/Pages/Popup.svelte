<script>
  /*Functional and module imports*/
  import Fa from "svelte-fa";
  import {
    faCog,
    faDotCircle,
    faThumbsUp,
    faSkull,
  } from "@fortawesome/free-solid-svg-icons";
  import { parseUrl } from "../util/utilities";
  import storage from "../util/storage";
  import browser from "webextension-polyfill";

  /*Components import*/
  import Progress from "./progress.svelte";

  const port = browser.extension.connect({
    name: "Popup Communication",
  });

  $: toggled = false;
  $: siteName = "";
  $: origin = {};


  async function setup() {
    toggled = await storage.redirection.get();
    origin = await storage.origin.get();
  }

  $: if (origin) {
    if (origin.url) {
      siteName = parseUrl(origin.url).name;
    }
  }

  /**
   * @function
   * @description Sends a message to the background script for intepretation.
   * Background script will initiate a tab update on the tab that triggered a redirection,
   * restoring the origin uri.
   */
  function gotoOrigin() {
    port.postMessage("goto: origin");
  }

  

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

  //Not the best name.
  //It's fine though really
  function toggleRedirection() {
    console.log("Toggled before ", toggled);
    storage.redirection.toggle();
    toggled = !toggled;
    console.log("Toggled after ", toggled);
  }

  setup();
</script>

<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->
<main>
  <div class="popup">
    <div class="container" style="margin-top: 10px">
      <img src="images/aikido.png" class="icon item" alt="Aiki logo" />
      <h5 class="header item">Aiki 3.0</h5>
    </div>
    <hr />
    <div class="container">
      <h6 class="item">Settings:</h6>
      <button
        type="default"
        class="btn btn-primary item"
        on:click={openSettingsPage}><Fa icon={faCog} /> Settings</button
      >
    </div>
    <hr />
    <div class="container">
      <h6 class="item">Toggle:</h6>
      <button
        type="default"
        class="btn {toggled ? 'btn-success' : 'btn-danger'} item"
        on:click={toggleRedirection}
        ><Fa icon={faDotCircle} /> {toggled ? "On" : "Off"}</button
      >
    </div>
    <hr />
    {#if siteName !== ""}
      <div class="container">
        <button
          type="default"
          on:click={gotoOrigin}
          class="btn btn-success item"
          ><Fa icon={faThumbsUp} /> Continue to {siteName}</button
        >
      </div>
      <hr />
      <div class="container">
        <button type="default" class="btn btn-secondary item"
          ><Fa icon={faSkull} /> Emergency Skip!</button
        >
      </div>
      <hr />
        <Progress {port} />
    {/if}
  </div>
</main>

<!-- Using a mix of flexbox and bootstap to get the styling done. -->
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

  .popup {
    padding: 5px;
  }

  .header {
    display: inline;
  }

  .icon {
    height: 27px;
    display: inline;
    padding-right: 10px;
  }

  hr {
    height: 1px;
    border-width: 0;
    color: gray;
    background-color: gray;
    width: 90%;
    margin: 10px 10px;
  }

  main {
    background-color: #282c34;
    color: white;
    text-align: center;
    height: fit-content;
    width: 250px;
  }
</style>
