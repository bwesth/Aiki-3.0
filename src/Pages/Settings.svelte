<!-- This component is used by extension when user opens settings page in extension menu.
  It is also opened by a button in extension popup component.
  This gathers all the settings components and displays them for the user to change the behaviour
  of the application.-->
<script>
  import Footer from "./Components/Settings/Footer.svelte";
  import Header from "./Components/Settings/Header.svelte";
  import Privacy from "./Components/Settings/Privacy.svelte";
  import SetUser from "./Components/Settings/SetUser.svelte";
  import SetWebsites from "./Components/Settings/SetTimeWastingSites.svelte";

  $: user = "";
  $: userIsRegistered = false;

  var port = chrome.extension.connect({
    name: "Settings Communication"
  });

  port.onMessage.addListener(function(msg) {
      console.log("message recieved" + msg);
  });

</script>

<main>
  <div class="flex-wrapper">
    <Header/>
    {#if !userIsRegistered}
    <div class="container">
      <Privacy />
    </div>
    {/if}
    <div class="container">
      <SetUser bind:user bind:userIsRegistered {port} />
    </div>
    {#if userIsRegistered}
    <div class="container">
      <SetWebsites {user} {port} />
    </div>
    {/if}
    <Footer/>
  </div>
</main>

<style>
  .container {
    margin:auto;
    padding:30px;
  }

  main {
    height:100%;
    background-color: #f0f2f5;
  }

  /* .flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  } */
</style>