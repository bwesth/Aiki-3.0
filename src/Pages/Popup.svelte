<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->

<!-- To begin with, the popup will only have a settings button for the logger. -->
<script>
  import browser from "webextension-polyfill";
	import Input from './Components/Input.svelte';

	let list;
	chrome.storage.sync.get("list", function (data) {
		list = data.list;
		console.log(list);
	});
	function setList() {
      chrome.storage.sync.set({ list: list }, function (value) {
        console.log(value);
      });
	  console.log(list)
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
    <!-- Using bootstraps flexbox rules here. -->
    <!-- https://getbootstrap.com/docs/4.0/utilities/flex/ -->
    <div class="d-flex flex-row justify-content-start">
      <div class="p-2">
        <img src='images/aikido.png' class="popupLogo" alt="logo" />
      </div>
      <div class="p-2">
        <h5>Aiki</h5>
      </div>
    </div>

    <hr> 

    <!-- Opens settings page. -->
    <div class="d-flex flex-row justify-content-center">
      <div class="p-2">
        <p>Settings:</p>
      </div>
      <div class="p-2">
        <button type="default" class="btn btn-primary" on:click={openSettingsPage}>Click Me</button>
      </div>
    </div>

  </div>
</main>

<style>

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