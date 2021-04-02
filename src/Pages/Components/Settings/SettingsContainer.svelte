<!-- This acts as a default container for all blocks in our settings page. 
Other components are placed into the <slot> element of this component -->
<script>
	export let headline;
	export let id = ""
</script>

<h4>{headline}</h4>
<div id={id} class="container">
    <slot></slot>
</div>

<style>
	h4{
		color:#444;
	}

	.container {
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		margin: 0 0 1em 0;
		padding: 1.5em;
		background-color: white;
		color: #444;
		width: 100%;
	}
</style>