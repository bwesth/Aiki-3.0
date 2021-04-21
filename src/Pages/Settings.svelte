<!-- This component is used by extension when user opens settings page in extension menu.
  It is also opened by a button in extension popup component.
  This gathers all the settings components and displays them for the user to change the behaviour
  of the application.
  Used in / Parent components: /src/App.svelte
-->
<script>
  /*Functional and module imports*/
  import browser from "webextension-polyfill";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  /*Components import*/
  import Footer from "./Components/Settings/Footer.svelte";
  import Header from "./Components/Settings/Header.svelte";
  import Privacy from "./Components/Settings/Privacy.svelte";
  import SetUser from "./Components/Settings/SetUser.svelte";
  import SetWebsites from "./Components/Settings/SetTimeWastingSites.svelte";
  import Statistics from "./Components/Settings/Statistics.svelte";
  import SetLearningSites from "./Components/Settings/SetLearningSites.svelte";

  $: user = "";
  $: userIsRegistered = false;

  const port = browser.extension.connect({
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
      <div class="container">
        <SetLearningSites />
      </div>
      <div class="container">
        <Statistics />
      </div>
    {/if}
  </main>
  <Footer />
</div>
<SvelteToast options={{ reversed: true, intro: { x: 192 } }} />

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
    --toastContainerTop: 0;
    --toastContainerRight: auto;
    --toastContainerBottom: auto;
    --toastContainerLeft: 0;
  }
</style>
