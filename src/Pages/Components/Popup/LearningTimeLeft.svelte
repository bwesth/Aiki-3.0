<!-- 
  Display used in the Popup to show remaining time during a learning session.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
 <!-- Doesn't work atm, passing props down isn't reactive. -->
 <script>
    import {parseTimerDownLong} from "../../../util/utilities"
    export let timeRemaining;
</script>

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
      font-size: 14px;
    }

    p {
        font-weight: 700;
        padding: 10px 0px 0px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #28a745;
    }
</style>
  