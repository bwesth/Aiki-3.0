
import App from "./App.svelte";
import { getTheme, drawTheme } from "./util/themes"

//This controls our theme!
const app = async ()=> {
  let theme = await getTheme();
  console.log("App script called with this theme:",theme);
  drawTheme(theme);
  return new App({
    target: document.body,
  });
}

// const app = new App({
//         target: document.body,
//       });

export default app();
