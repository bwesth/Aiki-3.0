<!-- 
  Display used in the Popup to show remaining procrastination time when procrastinating.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
  import { parseTimerDownLong } from "../../../util/utilities";
  export let rewardTimeRemaining;
</script>

<div
  class="container"
  data-toggle="tooltip"
  data-placement="top"
  title="Time you have left to procrastinate"
>
  <h6 class="item">Reward Time Left:</h6>
  <!-- Need a function to put a value in this P tag -->
  <p class="item">{parseTimerDownLong(rewardTimeRemaining)}</p>
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
    color: #17a2b8;
  }
</style>
