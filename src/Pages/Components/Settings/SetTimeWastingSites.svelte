<!-- This component is rendered as a block on the settings page for users to input their time wasting websites.-->

<script>
  import SettingsContainer from "./SettingsContainer.svelte";
</script>

<h4>Set Time Wasting Sites</h4>
<SettingsContainer>
    <h5>Add your Time Wasting Sites here:</h5>
    <hr>
    <p>Type in pages you feel like you spend a little too much time 
      on here (e.g. facebook.com, reddit.com):</p>

    <p><strong>NB:</strong> You can still visit these websites, we will just be tracking
      the amount of time you spend on them.</p>

    <!-- Bootstrap Input field. -->
    <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
    <!-- Important functionality needed here! -->
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Enter a time wasting site here..." aria-label="" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button">Add</button>
      </div>
    </div>

    <!-- Insert bootstrap table thing here -->
    <!-- Need to somehow create functionality tying this table to the above input. Aiki has some very impressive
    functionality here that would be nice to mimic. -->
    <table class="table">
      <thead class="thead-light ">
        <tr>
          <th scope="col">Page Name</th>
          <th scope="col">Page URL</th>
          <th scope="col">Remove Site from List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Basically need to find a way to inject rows, handle large amounts of sites, and add functionality
          to certain buttons in the row. -->
          <th scope="row">Reddit</th>
          <td>reddit.com</td>
          <td><button type="button" class="btn btn-danger">X</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Add pagination for more than 10 sites? -->

</SettingsContainer>

<style>
</style>