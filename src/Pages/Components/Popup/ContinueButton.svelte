<!-- 

  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  /* Functional and module imports */
  import Fa from "svelte-fa";
  import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

  export let siteName;
  export let gotoOrigin;
  
</script>

<button type="default" on:click={gotoOrigin} class="btn btn-success item"
  ><Fa icon={faThumbsUp} /> Continue to {siteName}
</button>


<style>


.item {
margin: auto auto;
}


</style>