<script>
  import Fa from "svelte-fa";
  
  export let icon;
  export let text;
  export let value;
</script>

<p>
  <Fa {icon} />&nbsp;<strong>{text}</strong>
  {#if value}
    {value}
  {:else}
    0
  {/if}
</p>
