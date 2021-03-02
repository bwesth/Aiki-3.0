import Popup from './Pages/Popup.svelte';
import Options from './Pages/Options.svelte'

function Router() {
let params = (new URL(window.location)).searchParams; // since chrome 51, no IE

    switch (params.get('page')) {
        case 'options':
            return <Options />;
        default:
            return <Popup />;
    }
}

const app = new Router({
	target: document.body
});

export default app;