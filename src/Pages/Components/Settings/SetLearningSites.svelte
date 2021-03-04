<!-- This component is rendered as a block on the settings page for users to select their chosen learning platforms.-->

<script>
import SettingsContainer from "./SettingsContainer.svelte";
import storage from "../../../util/storage";

let list = [];
storage.getLearningSites(data => list = data)
</script>

<h4>Set Learning Sites</h4>
<SettingsContainer>
    <h5>Choose the platform you wish to use to learn here:</h5>
    <hr>
    <p><strong>NB:</strong> You are welcome to use all of these platforms if you wish, but we will
    only track your time on the site(s) you choose here.</p>

    <!-- Bootstrap 5 Dropdown -->
    <!-- https://getbootstrap.com/docs/5.0/forms/select/ -->
    <!-- Need to find functionality to display chosen element in dropdown window -->
    <div class="container">
      <select class="form-select" aria-label="Default select example">
        <option selected>Choose your Platform</option>
        {#each list as item, index}
          <option value={index}>{item}</option>
        {/each}
      </select>
    </div>

</SettingsContainer>

<style>
  .container {
    text-align: center;
  }
</style>