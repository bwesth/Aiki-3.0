<!-- This component is rendered as a block on the settings page for users to input their time wasting websites.-->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from "../../../util/browserStorage"
  import { logConfigEvent } from "../../../util/logger"

  import Fa from 'svelte-fa'
  import { faTrashAlt, faGlobe, faKeyboard, faTimes } from '@fortawesome/free-solid-svg-icons'

  export let user = "";
  export let port;
  $: list = [];
  async function setup() {
    list = await storage.getList();
  }
  setup()
  let addItemValue = "";

  //TODO: Somehow have to call updateProcrastinationSites here...
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
    port.postMessage(`Update: list`);
  }

  //TODO: Somehow have to call updateProcrastinationSites here...
  async function addItem() {
    let site = parseURL(addItemValue);
    console.log(site);
    if (list.find(item => item.name == site.name)) {
      alert("Website already in list.");
      return;
    }
    //Need some defensive checking here. Is a website, empty strings, already on list, etc.
    let status = await pingSite(site.host)
    console.log(status)
    if (status) {
      let newList = [...list]
      newList.push(site);
      list = newList;
      storage.setList(list);
      logConfigEvent({
        user: user,
        event: "User added procrastination site",
        site: site
      })
      port.postMessage(`Update: list`);
      document.getElementById("addItem").value = "";
    } else {
      //add rejection function here
      alert("Website not available")
    }
  }

  function pingSite(site) {
    return new Promise(function (resolve, reject) {
      var link = document.createElement('img');
      link.src = `https://${site}/favicon.ico`
      link.style = "display: none;"
      link.onload = function () {
          resolve(true);
      };
      link.onerror = function () {
          const confirmation = confirm(`Could not establish connection to https://${site}/\nBe sure to check the spelling.
          \nDo you want to add it anyway?`);
          confirmation ? resolve(true) : resolve(false);
      };
      document.body.appendChild(link);
    });
  }

  function parseURL(site){
    let host = site.includes("http") ? site.split("/")[2] : site.split("/")[0];
    let name = host.includes("www") ? host.split(".")[1] : host.split(".")[0];
    return {host: host, name: name}
  }

  function firstLetterUppercase(string) 
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

</script>

<SettingsContainer headline="Set Time Wasting Sites">
    <h5>Add your Time Wasting Sites here:</h5>
    <hr>
    <p>Type in pages you feel like you spend a little too much time 
      on here (e.g. www.facebook.com, www.reddit.com, 9gag.com):</p>
    <p><strong>NB:</strong> You can still visit these websites, we will just be logging
      the amount of time you spend on them.</p>
    <!-- Bootstrap Input field. -->
    <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
    <form on:submit|preventDefault={addItem}>
      <div class="input-group mb-3">
        <input bind:value={addItemValue} id="addItem" type="text" class="form-control" placeholder="Enter a time wasting site here..." aria-label="" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
    </form>

    {#if list.length > 0}
    <table class="table">
      <thead class="thead-light ">
        <tr>
          <th scope="col"><Fa icon={faKeyboard}/> Page Name</th>
          <th scope="col"><Fa icon={faGlobe}/> Page URL</th>
          <th scope="col" style="text-align: center"><Fa icon={faTrashAlt}/> Remove Site</th>
        </tr>
      </thead>
      <tbody>
        {#each list as item, index}
          <tr>
            <th scope="row"><img class="webFavicon"
              src={`https://${item.host}/favicon.ico`} 
              alt="Favicon" 
              on:error={(event) => event.target.remove()}
            >
              {firstLetterUppercase(item.name)}
            </th>
            <td>
              {item.host}
            </td>
            <td style="text-align: center">
              <div title="Remove Site" on:click={() => removeItem(index)}>
                <Fa icon={faTimes} primaryColor="red"/>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    {/if}
    <!-- Add pagination for more than 10 sites? -->

</SettingsContainer>

<style>
  thead {
    padding: 20px;
    color: #444;
  }

  th {
    padding: 15px;
    color: #444;
  }

  td {
    padding: 15px;
    color: #444;
  }

  .webFavicon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 10px;
  }

  /* .btn-danger {
    width: 1.2em;
    height: 1.2em;
  } */
</style>