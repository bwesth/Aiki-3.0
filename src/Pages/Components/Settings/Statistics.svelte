<!-- 

  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
</script>

<SettingsContainer headline="Your Statistics">
  <p>Here's a scientific breakdown of your time online:</p>
  <img src="images/piechart.png" alt="pieboi" />
</SettingsContainer>

<style>
  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
</style>
