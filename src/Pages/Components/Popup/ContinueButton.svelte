<!-- 
  Button used in the Popup to continue to origin site after successfully completing a learning session.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  /* Functional and module imports */
  import storage from '../../../util/storage'
  import Fa from "svelte-fa";
  import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

  export let siteName;
  export let gotoOrigin;

  function handleClick(){
    gotoOrigin("continue")
  }
</script>

<button
  type="default"
  on:click={handleClick}
  class="btn btn-success item"
  ><Fa icon={faArrowAltCircleRight} /> Continue to {siteName}
</button>

<style>
  button {
    font-size: var(--fontSizePopup);
  }

  .item {
    margin: auto auto;
  }
</style>
