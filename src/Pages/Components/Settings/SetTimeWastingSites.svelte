<!-- 
  TODO: Description goes here
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import Container from "./Container.svelte";
  import storage from "../../../util/storage";
  import { parseUrl } from "../../../util/utilities";
  import Fa from "svelte-fa";
  import {
    faTrashAlt,
    faGlobe,
    faKeyboard,
    faTimes,
    faPlusCircle
  } from "@fortawesome/free-solid-svg-icons";
  import { toast } from "@zerodevx/svelte-toast";
  import * as themes from "./util/toastThemes";

  import API from '../../../API/index'
  import { eventNames, settingsMessages } from '../../../API/Event'

  export let port;
  $: list = [];

  let toastCoords = { y: "add-button", x: "site-input-container" };

  async function setup() {
    list = await storage.list.get();
  }
  setup();
  let addItemValue = "";

  async function removeItem(index) {
    const site = list[index];
    const eventDetails = {
      message: settingsMessages.timeWastingSiteRemoved,
      site: site,
    }
    const requestResult = await API.timeWastingSite.remove(site.host)
    if (requestResult) {
      API.event.create(eventNames.settingsChanged, eventDetails)
      let newList = [...list];
      newList.splice(index, 1);
      list = newList;
      storage.list.set(list);
      port.postMessage(`Update: list`);
      toast.pop();
      toast.push("Website removed!", {
        theme: themes.successTheme(toastCoords),
      });
    }
  }

  async function addItem() {
    if (addItemValue === "") {
      return;
    }
    let site = parseUrl(addItemValue);
    if (list.find((item) => item.name == site.name)) {
      toast.pop();
      toast.push("Website already in list.", {
        theme: themes.infoTheme(toastCoords),
      });
      return;
    }
    let status = await pingSite(site.host);
    if (status) {
      let newList = [...list];
      newList.push(site);
      list = newList;
      storage.list.set(list);
      const eventDetails = {
        message: settingsMessages.timeWastingSiteAdded,
        site: site,
      };
      const requestResult = await API.timeWastingSite.create(site.host);
      if (requestResult) {
        API.event.create(eventNames.settingsChanged, eventDetails);
        port.postMessage(`Update: list`);
        addItemValue = "";
        toast.pop();
        toast.push("New Website Added!", {
          theme: themes.successTheme(toastCoords),
        });
      }
    } else {
      // Seriously Bjørn, what's with this code? - kind regards, Bjørn
      // This means someone pressed cancel during the pingSite()
    }
  }

  function pingSite(site) {
    return new Promise(function (resolve, reject) {
      let link = document.createElement("img");
      link.src = `https://${site}/favicon.ico`;
      link.style = "display: none;";
      link.onload = function () {
        resolve(true);
      };
      link.onerror = function () {
        const confirmation = confirm(`
          We could not get the icon from https://${site}/. This either means the website does not exist, or it may not be an issue at all.\n
          Be sure to check the spelling or copy-paste the website address into the input field. \n
          If you are certain it is correct, click "yes"`);
        confirmation ? resolve(true) : resolve(false);
      };
      document.body.appendChild(link);
    });
  }

  function firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<Container id="site-input-container" headline="Set Time Wasting Sites">
  <h5>Add your Time Wasting Sites here:</h5>
  <hr />
  <p>
    Type in pages you feel like you spend a little too much time on here (e.g:
    www.facebook.com, www.reddit.com, 9gag.com).
  </p>
  <p>
    <strong>NB:</strong> You can still visit these websites, Aiki will just be logging
    the amount of time you spend on them.
  </p>

  <form on:submit|preventDefault={addItem}>
    <div data-tooltip="Add to your list of procrastination sites">
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
          <button id="add-button" class="btn btn-primary" type="submit"
            ><Fa icon={faPlusCircle} /> Add Site</button
          >
        </div>
      </div>
    </div>
  </form>

  {#if list.length > 0}
    <table>
      <thead>
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
            <td class="hostName">
              {item.host}
            </td>
            <td style="text-align: center">
              <div
                data-tooltip="Remove this site from the list."
                on:click={() => removeItem(index)}
              >
                <Fa icon={faTimes} primaryColor="red" />
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
  <!-- Add pagination for more than 10 sites? -->
</Container>

<style>
  table {
    width: 100%;
  }

  thead {
    padding: 20px;
    color: var(--textColor);
    background-color: var(--theadBackgroundColor);
  }

  th {
    color: var(--textColor);
    font-family: var(--fontContent);
    font-size: var(--fontSizeSettings);
    border-bottom: 1px solid var(--hrColor);
    border-top: 1px solid var(--hrColor);
    padding: 15px;
  }

  td {
    font-size: var(--fontSizeSettings);
    color: var(--textColor);
    border-bottom: 1px solid var(--hrColor);
    font-family: var(--fontContent);
    padding: 15px;
  }

  td.hostName {
    font-family: "Lucida Console", "Courier New", monospace;
  }

  h5 {
    font-family: var(--fontHeaders);
  }

  p {
    font-family: var(--fontContent);
    font-size: var(--fontSizeSettings);
  }

  hr {
    background-color: var(--hrColor);
  }

  .webFavicon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 10px;
  }
</style>
