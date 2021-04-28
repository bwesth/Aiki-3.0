<!-- Doesn't work atm, passing props down isn't reactive. -->
<script>
  import { parseTimerDownLong } from "../../../util/utilities";
  export let timeRemaining;
</script>

<!-- 
  Display used in the Popup to show remaining time during a learning session.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->

<div class="container">
  <h6 class="item">Learning Time Left:</h6>
  <p class="item">{parseTimerDownLong(timeRemaining)}</p>
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
