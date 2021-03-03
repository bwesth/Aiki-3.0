<script>
  import SettingsContainer from "./SettingsContainer.svelte";
</script>

<h4>Set Time Wasting Sites</h4>
<SettingsContainer>
    <h5>Add your Time Wasting Sites here</h5>
    <p>Type in pages you feel like you spend a little too much time 
      on here (e.g. facebook.com, reddit.com):</p>

    <p><strong>NB:</strong> You can still visit these websites, we will just be tracking
      the amount of time you spend on them.</p>

    <!-- Bootstrap Input field. -->
    <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Enter a time wasting site here..." aria-label="" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button">Add</button>
      </div>
    </div>

    <!-- Insert bootstrap table thing here -->
    
</SettingsContainer>

<style>
</style>