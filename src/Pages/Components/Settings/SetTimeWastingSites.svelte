<!-- This component is rendered as a block on the settings page for users to input their time wasting websites.-->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from "../../../util/storage"
  import { logConfigEvent } from "../../../util/logger"

  export let user = "";
  $: list = [];
  storage.getList(data => list = data);
  let addItemValue = "";

  function removeItem(index) {
    logConfigEvent({
      user: user,
      event: "User removed procrastination site",
      site: list[index]
    })
    let newList = [...list]
    newList.splice(index, 1);
    list = newList;
    storage.setList(list);
  }

  function addItem() {
    let site = parseURL(addItemValue)
    //Need some defensive checking here. Is a website, empty strings, already on list, etc.
    let newList = [...list]
    newList.push(site)
    list = newList;
    storage.setList(list);
    logConfigEvent({
      user: user,
      event: "User added procrastination site",
      site: site
    })
    document.getElementById("addItem").value = "";
  }

  function parseURL(site){
    let host = site.includes("http") ? site.split("/")[2] : site.split("/")[0];
    let name = site.includes("www") ? site.split(".")[1] : site;
    return {host: host, name: name}
  }
</script>

<SettingsContainer headline="Set Time Wasting Sites">
    <h5>Add your Time Wasting Sites here:</h5>
    <hr>
    <p>Type in pages you feel like you spend a little too much time 
      on here (e.g. facebook.com, reddit.com):</p>
    <p><strong>NB:</strong> You can still visit these websites, we will just be tracking
      the amount of time you spend on them.</p>
    <!-- Bootstrap Input field. -->
    <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
    <!-- Important functionality needed here! -->
    <form on:submit|preventDefault={addItem}>
      <div class="input-group mb-3">
        <input bind:value={addItemValue} id="addItem" type="text" class="form-control" placeholder="Enter a time wasting site here..." aria-label="" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
    </form>

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
        {#each list as item, index}
          <tr>
            <!-- Basically need to find a way to inject rows, handle large amounts of sites, and add functionality
            to certain buttons in the row. -->
            <th scope="row">{item.name}</th>
            <td>{item.host}</td>
            <td><button on:click={() => removeItem(index)} type="button" class="btn btn-danger">X</button></td>
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- Add pagination for more than 10 sites? -->

</SettingsContainer>

<style>
</style>