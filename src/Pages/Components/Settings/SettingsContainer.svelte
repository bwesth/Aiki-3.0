<!-- This acts as a default container for all blocks in our settings page. 
Other components are placed into the <slot> element of this component -->

<div class="container">
    <slot></slot>
</div>

<style>
	.container {
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		margin: 0 0 1em 0;
		padding: 1.5em;
		/* Aiki's sizes below, fucks up centering of elements. */
		/* min-width: 560px;
		max-width: 680px; */
	}
</style>