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
    font-family: var(--fontHeaders);
    color: var(--bannerTextColor);
    background-color: var(--bannerBackgroundColor);
    padding: 12px 0px;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.2));
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
