<!-- 
  Button used in the Popup to skip past a learning session to the origin site.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  import Fa from "svelte-fa";
  import { faSkull } from "@fortawesome/free-solid-svg-icons";

  export let gotoOrigin;
</script>

<button on:click={gotoOrigin} type="default" class="btn btn-secondary item"
  ><Fa icon={faSkull} /> Emergency Skip!</button
>


<style>

.item {
margin: auto auto;
}


</style>