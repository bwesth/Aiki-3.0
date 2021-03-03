<!-- Options component used by extension when user opens options page in extension menu 
    Also opened by button in extension popup component.-->

<!-- We will only use SetUser and SetWebsites for the first published application, the logger. 
More components will be added later. -->

<main>
  <Header/>
  <div class="container">
    <SetUser/>
    <SetWebsites/>
    <SetTime />
  </div>
  <Footer/>
</main>

<script>
import Footer from "./Components/Settings/Footer.svelte";
import Header from "./Components/Settings/Header.svelte";
import SetUser from "./Components/Settings/SetUser.svelte";
import SetWebsites from "./Components/Settings/SetTimeWastingSites.svelte";
import SetTime from "./Components/Settings/SetLearningSites.svelte";
</script>

<style>
  main {
    height:100%;
  }
</style>