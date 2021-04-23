<!-- 
  Display used in the Popup to show bonus learning time during a learning session.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
 <!-- Doesn't work atm, passing props down isn't reactive. -->
 <script>
    import {parseTimerUpLong} from "../../../util/utilities"
    export let bonusTime;
</script>

      <div class="container">
        <h6 class="item">Extra Learning Time:</h6>
        <p class="item">{parseTimerUpLong(bonusTime)}</p>
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
        color: #007bff;
    }
</style>
  