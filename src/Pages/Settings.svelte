<!-- This component is used by extension when user opens settings page in extension menu.
  It is also opened by a button in extension popup component.
  This gathers all the settings components and displays them for the user to change the behaviour
  of the application.-->

<!-- We will only use SetUser,SetWebsites and SetTime for the first published application, the logger. 
  More components will be added later. -->
  <script>
  import Footer from "./Components/Settings/Footer.svelte";
  import Header from "./Components/Settings/Header.svelte";
  import SetUser from "./Components/Settings/SetUser.svelte";
  import SetWebsites from "./Components/Settings/SetTimeWastingSites.svelte";
  import SetLearningSites from "./Components/Settings/SetLearningSites.svelte";
  
  $: user = "";
  $: userIsRegistered = false;

  </script>

<main>
  <Header/>
  <div class="container">
    <SetUser bind:user bind:userIsRegistered />
  </div>
  {#if userIsRegistered}
  <div class="container">
    <SetWebsites {user} />
  </div>
  <div class="container">
    <SetLearningSites {user} />
  </div>
  {/if}
  <Footer/>
</main>


<style>
  .container {
    margin:auto;
    padding:30px;
  }

  main {
    height:100%;
  }
</style>