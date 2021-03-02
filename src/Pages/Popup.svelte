<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->
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
    <header class="popup-header">
      <tr>
        <td span="6">
          <img src="images/aikido" class="popup-logo" alt="logo" />
        </td>
        <td>
          Aiki
        </td>
      </tr>
    </header>
    <!-- Functionality and styling needed for all these buttons! Aiki code below. -->
    <!-- Opens settings page -->

    <tr class="popup-body">
      <td span="14" class="popup-settings">
        Settings:
      </td>
      <td span="10" style="textAlign: center">
        <button type="default" 
        on:click={openSettingsPage}>Settings</button>
      </td>
    </tr>

    <!-- Turns extension on and off, do we want this?? -->
    <tr class="popup-body">
      <td span="10" >
        Status of Extension:
      </td>
      <td span="10" class="popup-slider" style="textAlign: center">
        <switch></switch>
      </td>
    </tr>   
    
    <!-- Shows total study sessions -->
    <tr class="popup-body">
      <td span="14" class="popup-statistics-title">
        <h3>Total Study Sessions</h3>
      </td>
      <td span="10" class="popup-statistics">
        <p>0 sessions completed</p>
      </td>
    </tr>

    <!-- Shows total study time -->
    <tr class="popup-body">
      <td span="14" class="popup-statistics-title">
        <h3>Total Study Time</h3>
      </td>
      <td span="10" class="popup-statistics">
        <p>0 minutes studied</p>
      </td>
    </tr>

    <!-- Button allows you to continue when you finish your site -->
    <button>Continue to /sitename</button>

    <!-- Button allows you to emergency skip to your original destination -->
    <button>Emergency skip to /sitename</button>
  </div>
</main>

<style>
.popup { text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  min-width: 250px;
  padding: 5px;
}

.popup-header {
  text-align: left;
  font-size: calc(10px + 4vmin);
  color: white;
  display: flex;
}

.popup-header>* {
  flex: 1 1 100px;
  margin: 10px;
}

.popup-body{
  text-align: right;
  border-top: 1px solid gray;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}

.popup-body-bottom{
  text-align: right;
  border-top: 1px solid gray;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}

.popup-settings {
  padding-top: 6px;
}

.popup-statistics-title{
  text-align: right;
  color: white;
}

.popup-statistics{
  text-align: center;
  color: greenyellow;
}

.popup-link {
  color: #61dafb;
}

.popup-logo {
  width: 30px;
}
</style>