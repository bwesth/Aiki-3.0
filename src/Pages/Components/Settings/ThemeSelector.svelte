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

  let themePromise = getTheme();

  function changeTheme(input) {
    switch (input) {
      case "light":
        drawLightMode();
        setTheme(input);
        break;

      case "dark":
        drawDarkMode();
        setTheme(input);
        break;

      case "blue":
        drawBlueMode();
        setTheme(input);
        break;

      case "zeeguu":
        drawZeeguuMode();
        setTheme(input);
        break;
    }
    themePromise = getTheme();
  }
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
    {#await themePromise}
      LOADING...
    {:then theme}
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
    {/await}
  </div>
</div>

<style>
</style>
