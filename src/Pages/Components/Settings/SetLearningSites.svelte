<!-- This component is rendered as a block on the settings page for users to select their chosen learning platforms.-->

<script>
import SettingsContainer from "./SettingsContainer.svelte";
import storage from "../../../util/storage";
import { logConfigEvent } from "../../../util/logger"


let list = [];
storage.getLearningSites(data => list = data)

let selected;
storage.getRedirectionSite(data => selected = data)

function changeSite() {
  storage.setRedirectionSite(selected)
  logConfigEvent({
    user: "",
    event: "User changed redirection site",
    site: selected
  })
}
</script>

<h4>Learning Sites</h4>
<SettingsContainer>
    <h5>We can recommend these platforms for learning Python:</h5>
    <hr>
    <p>For the purposes of the test we have curated a list of sites which we recommend you use to learn
      Python. They are as follows:
    </p>

    <ul>
      <li><a href="www.codecademy.com">Codecademy.com</a></li>
      <li><a href="www.codecademy.com">Codecademy.com</a></li>
      <li><a href="www.codecademy.com">Codecademy.com</a></li>
      <li><a href="www.codecademy.com">Codecademy.com</a></li>
      <li><a href="www.codecademy.com">Codecademy.com</a></li>
    </ul>

    <p>Whenever you visit one of these sites, we will track and log the time you spend there.</p>

    <h5>Choose the platform you wish to be directed to here:</h5>
    <hr>
    <p><strong>NB:</strong> You are welcome to use all of the above platforms if you wish, but we will
    only redirect you to this page when you procrastinate.</p>

    <!-- Bootstrap 5 Dropdown -->
    <!-- https://getbootstrap.com/docs/5.0/forms/select/ -->
    <!-- Need to find functionality to display chosen element in dropdown window -->
    <div class="container">
      <!-- svelte-ignore a11y-no-onchange -->
      <select bind:value={selected} on:change="{changeSite}">
        {#each list as item}
          <option value={item}>
            {item}
          </option>
        {/each}
        </select>
    </div>

</SettingsContainer>

<style>
  .container {
    text-align: center;
  }
</style>