<!-- This component is used by extension when user opens settings page in extension menu.
  It is also opened by a button in extension popup component.
  This gathers all the settings components and displays them for the user to change the behaviour
  of the application.-->
<script>
  import browser from "webextension-polyfill";
  import Footer from "./Components/Settings/Footer.svelte";
  import Header from "./Components/Settings/Header.svelte";
  import Privacy from "./Components/Settings/Privacy.svelte";
  import SetUser from "./Components/Settings/SetUser.svelte";
  import SetWebsites from "./Components/Settings/SetTimeWastingSites.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  $: user = "";
  $: userIsRegistered = false;

  var port = browser.extension.connect({
    name: "Settings Communication",
  });
</script>

<div class="settings">
  <Header />
  <main>
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
  </main>
  <Footer />
</div>
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style>
  .settings {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    background-color: #f0f2f5;
  }

  .container {
    margin: auto;
    padding: 30px;
  }

  main {
    flex-grow: 1;
    flex-shrink: 0;
    margin-top: 4em;
    background-color: #f0f2f5;
  }

  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }
</style>
