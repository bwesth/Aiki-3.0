<!-- 
  Header bar for the settings page.
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
</script>

<header>
  <h1>Aiki<sup>3</sup></h1>
</header>

<style>
  h1 {
    margin-top: 10px;
  }

  header {
    font-family: var(--fontHeaders);
    color: var(--bannerTextColor);
    background-color: var(--bannerBackgroundColor);
    display: flex;
    z-index: 999;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    flex-shrink: 0;
    text-align: center;
    margin: 0;
    padding: 0;
    height: 4em;
    width: 100%;
    /* box-shadow: 10px 0px 5px #121212; */
  }
</style>
