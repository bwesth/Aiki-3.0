<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->
<!-- To begin with, the popup will only have a settings button for the logger. -->

<script>
import storage from '../util/storage'
import {logConfigEvent} from "../util/logger"

$: redirectionToggled = false;
storage.getRedirectionToggled((toggled) => redirectionToggled = toggled)

function toggleRedirection(){
  storage.getUID((user) => logConfigEvent({
      user: user,
      event: `User toggled retirection ${redirectionToggled ? 'on' : "off"}`
    })
  )
    storage.toggleRedirection()
}

/* Opens a new tab with settings page and selects it */
  function openSettingsPage () {
    chrome.management.getSelf(result => {
          chrome.tabs.create({
              active: true,
              url: result.optionsUrl
          })
      })
  }
</script>

<main>
  <div class="popup">
    <!-- Using bootstraps grid layout here. -->
    <!-- https://getbootstrap.com/docs/4.0/layout/grid/ -->
    <div class="container">
      <div class="row">
        <div class="col">
          <img src='images/aikido.png' class="popupLogo" alt="logo" />
        </div>
        <div class="col-6">
          <h5>Aiki</h5>
        </div>
      </div>
    </div>

    <hr> 

    <!-- Open settings page -->
    <div class="container">
      <div class="row">
        <div class="col">
          <p>Settings:</p>
        </div>
        <div class="col-6">
          <button type="default" class="btn btn-primary" on:click={openSettingsPage}>Click Me</button>
        </div>
      </div>
    </div>

  </div>
  <div class="custom-control custom-switch">
    <input bind:checked="{redirectionToggled}" on:change={toggleRedirection} type="checkbox" class="custom-control-input" id="customSwitch1">
    <label class="custom-control-label" for="customSwitch1">Toggle Aiki redirection</label>
  </div>
</main>

<style>
  .popup {
    padding: 5px;
  }

  hr {
    height:1px;
    border-width:0;
    color:gray;
    background-color:gray;
    width: 90%;
  }

  main {
    background-color:#282C34;
    color: white;
    text-align: center;
    height:fit-content;
    width:250px;
  }
  
</style>