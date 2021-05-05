<!--
    Allows the user to choose a theme for the application.
    Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import Fa from "svelte-fa";
  import {
    setTheme,
    getTheme,
    drawDarkMode,
    drawLightMode,
    drawBlueMode,
    drawZeeguuMode,
  } from "../../../util/themes";
  import {
    faMoon,
    faSun,
    faCrow,
    faBookReader,
  } from "@fortawesome/free-solid-svg-icons";

  let theme = "light";

  async function checkTheme() {
    theme = await getTheme();
  }

  //Probably want to move this to themes.js? Some logic needs to be worked out.
  function changeTheme(input) {
    switch (input) {
      case "light":
        theme = "light";
        drawLightMode();
        setTheme(input);
        break;

      case "dark":
        theme = "dark";
        drawDarkMode();
        setTheme(input);
        break;

      case "blue":
        theme = "blue";
        drawBlueMode();
        setTheme(input);
        break;

      case "zeeguu":
        theme = "zeeguu";
        drawZeeguuMode();
        setTheme(input);
        break;
    }
  }

  checkTheme();
</script>

<div class="dropdown">
  <button
    class="btn btn-secondary dropdown-toggle"
    type="button"
    id="dropdownMenu2"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Themes
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button
      type="button"
      class="dropdown-item btn btn-light item"
      disabled={theme === "light" ? true : false}
      on:click={() => changeTheme("light")}
    >
      <Fa icon={faSun} /> Light</button
    >
    <button
      type="button"
      class="dropdown-item btn btn-dark item"
      disabled={theme === "dark" ? true : false}
      on:click={() => changeTheme("dark")}
    >
      <Fa icon={faMoon} /> Dark</button
    >
    <button
      type="button"
      class="dropdown-item btn btn-info item"
      disabled={theme === "blue" ? true : false}
      on:click={() => changeTheme("blue")}
    >
      <Fa icon={faCrow} /> Blue</button
    >
    <button
      type="button"
      class="dropdown-item btn btn-warning item"
      disabled={theme === "zeeguu" ? true : false}
      on:click={() => changeTheme("zeeguu")}
    >
      <Fa icon={faBookReader} /> Zeeguu</button
    >
  </div>
</div>

<style>
</style>
