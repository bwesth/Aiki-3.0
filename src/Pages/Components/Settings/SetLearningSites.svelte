<!-- This component is rendered as a block on the settings page for users to input their chosen learning platforms.-->

<script>
import SettingsContainer from "./SettingsContainer.svelte";
</script>

<h4>Set Learning Sites</h4>
<SettingsContainer>
    <h5>Choose the platform you wish to use to learn here:</h5>
    <hr>
    <p><strong>NB:</strong> You can still visit these websites, we will just be tracking
    the amount of time you spend on them.</p>
    <!-- Bootstrap Dropdown -->
    <!-- Need to find functionality to display chosen element in dropdown window -->
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="www.scrimba.com">Scrimba.com</a>
          <a class="dropdown-item" href="www.codecademy.com">CodeCademy.com</a>
          <a class="dropdown-item" href="www.sololearn.com">SoloLearn.com</a>
        </div>
      </div>

</SettingsContainer>

<style>
</style>