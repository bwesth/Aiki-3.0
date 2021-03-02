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


/* Opens a new tab with options page and selects it */
function background () {
    chrome.tabs.create({
        active: true,
        url: "chrome-extension://hdjkcmlkbcghngeflpaggojbahhhilpd/index.html?page=options"
    })
}
</script>

<main>
	<h3>These are your registered procrastination sites:</h3>
	{#if list !== undefined}
		{#each list as item}
			<Input bind:value={item}/>
		{/each}	
	{/if}
	<button on:click={setList}>Save list</button>
</main>


<button on:click={() => background()}>Go to background</button>



<style>
.Popup {
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  min-width: 250px;
  padding: 5px;
}

.Popup-header {
  text-align: left;
  font-size: calc(10px + 4vmin);
  color: white;
  display: flex;
}

.Popup-header>* {
  flex: 1 1 100px;
  margin: 10px;
}

.Popup-body{
  text-align: right;
  border-top: 1px solid gray;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}

.Popup-body-bottom{
  text-align: right;
  border-top: 1px solid gray;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}

.Popup-settings {
  padding-top: 6px;
}

.Popup-statistics-title{
  text-align: right;
  color: white;
}

.Popup-statistics{
  text-align: center;
  color: greenyellow;
}

.Popup-link {
  color: #61dafb;
}

.Popup-logo {
  width: 30px;
}
</style>