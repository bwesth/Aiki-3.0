// Controls themes for the application. This is achieved by switching out global CSS variables in global.css
// Currently offers three themes.

// TODO: Put storage functions in storage
// TODO: JSdocs
//Should maybe put storage methods in storage.js, but just to avoid collisions will write all the logic here first.
import browser from "webextension-polyfill";
const storage = browser.storage.local;

//Variable that selects the root CSS file.
const r = document.querySelector(':root');
const root = r.style;

//Basic getter. Choice of theme is stored in localstorage.
export async function getTheme() {
    const result = await storage.get("theme");
    return result.theme;
}

//Basic setter. Choice of theme is stored in localstorage.
export function setTheme(theme) {
    storage.set({ theme: theme });
}

//Draws the theme. Fire on boot?
export async function drawTheme() {
    const theme = await getTheme();
    switch(theme) {
        case "dark":
          drawDarkMode();
          break;
        case "light":
          drawLightMode();
          break;
        case "blue":
          drawBlueMode();
          break;
        default:
          drawLightMode();
      }
}

//Sets CSS variables to make Aiki appear in dark mode.
export function drawDarkMode() {
	root.setProperty('--textColor', '#FFFFFF');
	root.setProperty('--backgroundColorPrimary', '#1F2933');
    root.setProperty('--backgroundColorSecondary', '#323F4B');
    root.setProperty('--borderColor', '#12171D');
	root.setProperty('--bannerTextColor', '#FFFFFF');
    root.setProperty('--bannerBackgroundColor', '#3E4C59');
	root.setProperty('--hrColor', '#616E7C');
    root.setProperty('--footerBackgroundColor', '#3E4C59');
    root.setProperty('--theadBackgroundColor', '#3E4C59');
}

//Sets CSS variables to make Aiki appear in light mode.
export function drawLightMode() {
	root.setProperty('--textColor', '#444444');
	root.setProperty('--backgroundColorPrimary', '#f0f2f5');
    root.setProperty('--backgroundColorSecondary', '#FFFFFF');
    root.setProperty('--borderColor', '#AAAAAA');
	root.setProperty('--bannerTextColor', '#FFFFFF');
    root.setProperty('--bannerBackgroundColor', '#282C34');
	root.setProperty('--hrColor', '#D3D3D3');
    root.setProperty('--footerBackgroundColor', '#E8ECF3');
    root.setProperty('--theadBackgroundColor', '#D3D3D3');
}

//Sets CSS variables to make Aiki appear in theme three.
export function drawBlueMode() {
	root.setProperty('--textColor', '#24292F');
	root.setProperty('--backgroundColorPrimary', '#88909D');
    root.setProperty('--backgroundColorSecondary', '#D0DAE3');
    root.setProperty('--borderColor', '#6E7884');
	root.setProperty('--bannerTextColor', '#0D101F');
    root.setProperty('--bannerBackgroundColor', '#EAEEF1');
	root.setProperty('--hrColor', '#EAEEF1');
    root.setProperty('--footerBackgroundColor', '#EAEEF1');
    root.setProperty('--theadBackgroundColor', '#EAEEF1');
}