<!-- 
  Button used in the Popup to continue to origin site after successfully completing a learning session.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  /* Functional and module imports */
  import Fa from "svelte-fa";
  import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

  export let siteName;
  export let gotoOrigin;
  
</script>

<button type="default" on:click={() => gotoOrigin("continue")} class="btn btn-success item"
  ><Fa icon={faArrowAltCircleRight} /> Continue to {siteName}
</button>


<style>
  button {
    font-size: 14px;
  }

  .item {
    margin: auto auto;
  }
</style>