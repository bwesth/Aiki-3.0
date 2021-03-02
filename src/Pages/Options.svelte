<!-- Options component used by extension when user opens options page in extension menu 
    Also opened by button in extension popup component.
-->


<Header/>
<SetUser/>
<SetTime/>
<SetWebsites/>
<Statistics/>
<Footer/>

<script>
import Footer from "./Components/Options/Footer.svelte";
import Header from "./Components/Options/Header.svelte";

import SetTime from "./Components/Options/SetTime.svelte";
import SetUser from "./Components/Options/SetUser.svelte";
import SetWebsites from "./Components/Options/SetWebsites.svelte";
import Statistics from "./Components/Options/Statistics.svelte";
</script>

<style>
</style>