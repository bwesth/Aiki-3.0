<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->

<!-- The popup will only have a settings panel for the logger. -->
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
    <h5>Aiki</h5>
    <!-- Opens settings page -->
    <h6>Settings:</h6>
    <button type="default" on:click={openSettingsPage}>Settings</button>
    </div>
</main>

<style>
  main {
    background-color:#282C34;
    color: white;
    text-align: center;
  }

  button {
    display:block;
    height: 300px;
    width: 300px;
    border-radius: 50%;
    border: 1px solid red;
  }
  
</style>