<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->
<!-- To begin with, the popup will only have a settings button for the logger. -->

<script>
  import Fa from 'svelte-fa'
  import { faCog } from '@fortawesome/free-solid-svg-icons'

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
    <div class="container" style="margin-top: 10px">
      <img src='images/aikido.png' class="icon item" alt="Aiki logo"/>
      <h5 class="header item">Aiki 3.0</h5>
    </div>
    <hr> 
    <div class="container">
      <h6 class="item">Settings:</h6>
      <button type="default" class="btn btn-primary item" on:click={openSettingsPage}><Fa icon={faCog}/> Settings</button>
    </div>
    <div class="container">
      <button type="default" class="btn btn-primary item" on:click={openSettingsPage}><Fa icon={faCog}/> Settings</button>
    </div>
    <div class="container">
      <button type="default" class="btn btn-primary item" on:click={openSettingsPage}><Fa icon={faCog}/> Settings</button>
    </div>
    <hr>
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
    height:1px;
    border-width:0;
    color:gray;
    background-color:gray;
    width: 90%;
    margin: 10px 10px;
  }

  main {
    background-color:#282C34;
    color: white;
    text-align: center;
    height:fit-content;
    width:250px;
  }
</style>