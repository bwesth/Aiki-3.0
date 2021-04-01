<!-- This component is rendered as a block on the settings page for users to input their time wasting websites.-->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from "../../../util/storage";
  import firebase from "../../../util/firebase";
  import { parseUrl, makeDate } from "../../../util/utilities";
  import Fa from "svelte-fa";
  import {
    faTrashAlt,
    faGlobe,
    faKeyboard,
    faTimes,
  } from "@fortawesome/free-solid-svg-icons";
  import { toast } from "@zerodevx/svelte-toast";

  export let user = "";
  export let port;
  $: list = [];
  async function setup() {
    list = await storage.getList();
  }
  setup();
  let addItemValue = "";

  function removeItem(index) {
    firebase.addLog(
      {
        user: user,
        event: "User removed procrastination site",
        site: list[index],
        date: makeDate(),
      },
      "config"
    );
    let newList = [...list];
    newList.splice(index, 1);
    list = newList;
    storage.setList(list);
    port.postMessage(`Update: list`);
    toast.push("Website removed!", { theme: {
    '--toastBackground': 'black',
    '--toastColor': 'white',
    '--toastContainerTop': '5rem',
    '--toastContainerRight': 'auto',
    '--toastContainerBottom': 'auto',
    '--toastContainerLeft': 'auto'
  }});
  }

  async function addItem() {
    if (addItemValue === "") {
      return;
    }
    let site = parseUrl(addItemValue);
    if (list.find((item) => item.name == site.name)) {
      alert("Website already in list.");
      return;
    }
    let status = await pingSite(site.host);
    if (status) {
      let newList = [...list];
      newList.push(site);
      list = newList;
      storage.setList(list);
      firebase.addLog(
        {
          user: user,
          event: "User added procrastination site",
          site: site,
          date: makeDate(),
        },
        "config"
      );
      port.postMessage(`Update: list`);
      addItemValue = "";
      toast.push("New Website Added!");
    } else {
      //add rejection function here
      alert("Website not available");
    }
  }

  function pingSite(site) {
    return new Promise(function (resolve, reject) {
      var link = document.createElement("img");
      link.src = `https://${site}/favicon.ico`;
      link.style = "display: none;";
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

  function firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<SettingsContainer headline="Set Time Wasting Sites">
  <h5>Add your Time Wasting Sites here:</h5>
  <hr />
  <p>
    Type in pages you feel like you spend a little too much time on here (e.g.
    www.facebook.com, www.reddit.com, 9gag.com):
  </p>
  <p>
    <strong>NB:</strong> You can still visit these websites, we will just be logging
    the amount of time you spend on them.
  </p>
  <!-- Bootstrap Input field. -->
  <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
  <form on:submit|preventDefault={addItem}>
    <div class="input-group mb-3">
      <input
        bind:value={addItemValue}
        id="addItem"
        type="text"
        class="form-control"
        placeholder="Enter a time wasting site here..."
        aria-label=""
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </div>
  </form>

  {#if list.length > 0}
    <table class="table">
      <thead class="thead-light ">
        <tr>
          <th scope="col"><Fa icon={faKeyboard} /> Page Name</th>
          <th scope="col"><Fa icon={faGlobe} /> Page URL</th>
          <th scope="col" style="text-align: center"
            ><Fa icon={faTrashAlt} /> Remove Site</th
          >
        </tr>
      </thead>
      <tbody>
        {#each list as item, index}
          <tr>
            <th scope="row"
              ><img
                class="webFavicon"
                src={`https://${item.host}/favicon.ico`}
                alt="Favicon"
                on:error={(event) => event.target.remove()}
              />
              {firstLetterUppercase(item.name)}
            </th>
            <td>
              {item.host}
            </td>
            <td style="text-align: center">
              <div title="Remove Site" on:click={() => removeItem(index)}>
                <Fa icon={faTimes} primaryColor="red" />
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
</style>
