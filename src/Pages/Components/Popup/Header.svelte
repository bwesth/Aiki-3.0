<!-- 
  Header used in the Popup.
  Used in / Parent components: /src/Pages/Popup.svelte
 -->
<script>
</script>

<div class="header">
    <img src="images/aikido.png" class="icon" alt="Aiki logo" />
    <h5 class="text">Aiki<sup>3</sup></h5>
</div>

<style>
  .header {
    padding: 12px 0px;
    color: white;
    background-color: #282c34;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h5 {
    display: inline;
    margin: 0;
  }

  .icon {
    height: 27px;
    display: inline;
    padding-right: 10px;
  }
</style>