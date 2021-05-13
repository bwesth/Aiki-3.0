<!-- 
  Button used in the Popup to skip past a learning session to the origin site.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  import Fa from "svelte-fa";
  import { faSkull } from "@fortawesome/free-solid-svg-icons";

  export let gotoOrigin;

  function handleClick() {
    gotoOrigin("skip");
  }
</script>

<button
  on:click={handleClick}
  type="default"
  class="btn btn-danger item"
  data-toggle="tooltip"
  data-placement="top"
  title="Skip this learning session and go to procrastination land!"
  ><Fa icon={faSkull} /> Emergency Skip!</button
>

<style>
  button {
    font-size: var(--fontSizePopup);
  }

  .item {
    margin: auto auto;
  }
</style>
