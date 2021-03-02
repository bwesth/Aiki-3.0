<!-- Options component used by extension when user opens options page in extension menu 
    Also opened by button in extension popup component.
-->
<main>
  <Header/>
  <div class="container">
    <SetUser/>
    <SetTime/>
    <SetWebsites/>
    <Statistics/>
  </div>
  <Footer/>
</main>

<script>
import Footer from "./Components/Settings/Footer.svelte";
import Header from "./Components/Settings/Header.svelte";
import SetTime from "./Components/Settings/SetTime.svelte";
import SetUser from "./Components/Settings/SetUser.svelte";
import SetWebsites from "./Components/Settings/SetWebsites.svelte";
import Statistics from "./Components/Settings/Statistics.svelte";
</script>

<style>
  main {
    height:100%;
  }
</style>