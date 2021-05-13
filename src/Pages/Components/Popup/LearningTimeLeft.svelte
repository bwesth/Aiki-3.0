<!-- 
  Display used in the Popup to show remaining time during a learning session.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  import { parseTimerDownLong } from "../../../util/utilities";
  export let learnTimeRemaining;
</script>

<div
  class="container"
  data-toggle="tooltip"
  data-placement="top"
  title="Time until this learning session is complete"
>
  <h6 class="item">Learning Time Left:</h6>
  <p class="item">{parseTimerDownLong(learnTimeRemaining)}</p>
</div>

<style>
  .container {
    display: block;
    justify-content: center;
    align-content: center;
    flex-direction: row;
  }

  .item {
    margin: auto auto;
  }

  h6 {
    font-size: var(--fontSizePopup);
    color: var(--textColor);
    padding-top: 5px;
  }

  p {
    font-size: var(--fontSizePopup);
    font-weight: 700;
    padding: 10px 0px 0px;
    justify-content: center;
    align-items: center;
    color: #28a745;
  }
</style>
