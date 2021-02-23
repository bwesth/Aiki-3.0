<script>
  	import browser from "webextension-polyfill";
	import Input from './Input.svelte';
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