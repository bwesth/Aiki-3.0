<!-- This acts as a default container for all tabs in our settings page. 
Other components are placed into the <slot> element of this component -->

<div class="container">
    <slot></slot>
</div>

<style>
	.header {
		padding: 10px;
	}
	.container {
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1.5em;
		margin: 0 0 1em 0;
	}
</style>