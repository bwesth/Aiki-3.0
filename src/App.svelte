<!-- Entry component rendered into body of index.html. 
    Imports both Pages and Popup components.
    Uses a switch to set selected component based on search parameters in the window.location.
    svelte:component is used to dynamically paint selected component.
-->
<script>
import Popup from './Pages/Popup.svelte'
import Options from './Pages/Settings.svelte'

let selected = Popup;

switch (new URL(window.location).searchParams.get("page")) {
    case "options":
        selected = Options;
        break;
    default:
        selected = Popup;
        break;
}
</script>


<svelte:component class="thisthing" this={selected} />

