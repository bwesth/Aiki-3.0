// Controls themes for the application. This is achieved by switching out global CSS variables in global.css
// Currently offers four themes.

// TODO: Put storage functions in storage
import browser from "webextension-polyfill";
const storage = browser.storage.local;

// Variable that selects the root CSS file.
const r = document.querySelector(":root");
const root = r.style;

/**
 * @function
 * @returns {string} Theme
 * @description  Returns the name of the theme stored in localstorage. */
export async function getTheme() {
  const result = await storage.get("theme");
  return result.theme;
}

/**
 * @function
 * @param {string} theme
 * @description  Sets the theme stored in local storage to the provided theme. */
export function setTheme(theme) {
  storage.set({ theme: theme });
}

/**
 * @function
 * @description  Checks the theme stored in local storage and calls the
 * function required to draw said theme. */
export async function drawTheme() {
  const theme = await getTheme();
  switch (theme) {
    case "dark":
      drawDarkMode();
      break;
    case "light":
      drawLightMode();
      break;
    case "blue":
      drawBlueMode();
      break;
    case "zeeguu":
      drawZeeguuMode();
      break;
    default:
      drawLightMode();
  }
}

/**
 * @function
 * @description  Switches out the global css variables stored in global.css
 * to change the theme of the application to 'Dark'*/
export function drawDarkMode() {
  root.setProperty("--textColor", "#FFFFFF");
  root.setProperty("--backgroundColorPrimary", "#1F2933");
  root.setProperty("--backgroundColorSecondary", "#323F4B");
  root.setProperty("--borderColor", "#12171D");
  root.setProperty("--bannerTextColor", "#FFFFFF");
  root.setProperty("--bannerBackgroundColor", "#3E4C59");
  root.setProperty("--hrColor", "#616E7C");
  root.setProperty("--footerBackgroundColor", "#3E4C59");
  root.setProperty("--theadBackgroundColor", "#3E4C59");
}

/**
 * @function
 * @description  Switches out the global css variables stored in global.css
 * to change the theme of the application to 'Light'*/
export function drawLightMode() {
  root.setProperty("--textColor", "#444444");
  root.setProperty("--backgroundColorPrimary", "#f0f2f5");
  root.setProperty("--backgroundColorSecondary", "#FFFFFF");
  root.setProperty("--borderColor", "#AAAAAA");
  root.setProperty("--bannerTextColor", "#FFFFFF");
  root.setProperty("--bannerBackgroundColor", "#282C34");
  root.setProperty("--hrColor", "#D3D3D3");
  root.setProperty("--footerBackgroundColor", "#E8ECF3");
  root.setProperty("--theadBackgroundColor", "#D3D3D3");
}

/**
 * @function
 * @description  Switches out the global css variables stored in global.css
 * to change the theme of the application to 'Blue'*/
export function drawBlueMode() {
  root.setProperty("--textColor", "#212121");
  root.setProperty("--backgroundColorPrimary", "#F5F6FB");
  root.setProperty("--backgroundColorSecondary", "#FFFFFF");
  root.setProperty("--borderColor", "#EDEDED");
  root.setProperty("--bannerTextColor", "#FFFFFF");
  root.setProperty("--bannerBackgroundColor", "#3366FF");
  root.setProperty("--hrColor", "#EAEAEA");
  root.setProperty("--footerBackgroundColor", "#99B2FF");
  root.setProperty("--theadBackgroundColor", "#EAEAEA");
}

/**
 * @function
 * @description  Switches out the global css variables stored in global.css
 * to change the theme of the application to 'Zeeguu'*/
export function drawZeeguuMode() {
  root.setProperty("--textColor", "#263238");
  root.setProperty("--backgroundColorPrimary", "#F7F7F7");
  root.setProperty("--backgroundColorSecondary", "#FFFFFF");
  root.setProperty("--borderColor", "#EFEFEF");
  root.setProperty("--bannerTextColor", "#FFFFFF");
  root.setProperty("--bannerBackgroundColor", "#FEBF00");
  root.setProperty("--hrColor", "#EFEFEF");
  root.setProperty("--footerBackgroundColor", "#F2C76B");
  root.setProperty("--theadBackgroundColor", "#F7F7F7");
}
