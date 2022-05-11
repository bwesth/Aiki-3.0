<!-- This component is rendered as a block on the settings 
  page for users to input their UID for logging purposes.
  Used in / Parent components: /src/Pages/Settings.svelte
  TODO: login/register options from Parse
-->
<script>
  import Container from "./Container.svelte";
  import storage from "../../../util/storage";
  import Fa from "svelte-fa";
  import { faUserSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
  import { toast } from "@zerodevx/svelte-toast";
  import * as themes from "./util/toastThemes";

  import API from '../../../API/index'
  import { eventNames, settingsMessages } from '../../../API/Event'

  export let user = "";
  let password = ""
  export let userIsRegistered;

  export let port;
  let toastCoords = { y: "id-input-field", x: "user-settings" };

  async function setup() {
    user = await storage.uid.get();
    userIsRegistered = user !== "" ? true : false;
  }

  function logon() {
    storage.uid.set(user);
    const eventDetails = {
      message: settingsMessages.addedUser,
      userID: user
    }
    API.event.create(eventNames.settingsChanged, eventDetails)
    API.user.login(user, password)
    userIsRegistered = true;
    port.postMessage(`Update: user`);
    setTimeout(() => {
      toast.push("Logged in succesful.", {
        theme: themes.successTheme(toastCoords),
      });
    }, 500);
  }

  function logout() {
    const confirmation = confirm(
      "Are you certain you want to log out?"
    );
    if (confirmation) {
      const eventDetails = {
        message: settingsMessages.resetUser, //should be logout, need a "destroy (archive) user" function too
        userID: user
      }
      API.event.create(eventNames.settingsChanged, eventDetails)
      API.user.logout()
      storage.uid.set("");
      userIsRegistered = false;
      user = "";
      port.postMessage(`Update: user`);
    }
  }

  function deleteUser() {
    const confirmation = confirm(
      "Are you certain you want delete your account? \n This is non-reversable, although you can always make a new. \n NB: we will save your data for research purposes, but remove everything that can identify you according to GDPR."
    );
    if (confirmation) {
      const eventDetails = {
        message: settingsMessages.deleteUser,
        userID: user
      }
      API.event.create(eventNames.settingsChanged, eventDetails)
      API.user.archive()
      storage.uid.set("");
      userIsRegistered = false;
      user = "";
      port.postMessage(`Update: user`);
    }
  }

  setup();
</script>

<Container id="user-settings" headline="Account">
  {#if userIsRegistered}
    <h5>Registered Email:</h5>
    <input
      id="id-input-field"
      class="form-control"
      type="text"
      placeholder={user}
      readonly
    />
    <button
      class="btn btn-danger"
      on:click={logout}
      data-tooltip="Log out. WARNING: Aiki will not work while no user is logged in."
      ><Fa icon={faUserSlash} />Log out</button
    >
  {:else}
    <h5>Add your email here so we can log your activity:</h5>
    <hr />
    <p>
      <strong>Note:</strong> Please make sure you enter the correct email you have
      been using so far for the study. If you provide the incorrect one, your data
      is likely to become mixed up with another participant.
    </p>
    <p>
      Secondly, please note that you may be asked to re-enter your email if you
      clear your cache or browser history, in order for us to resume logging.
    </p>
    <p>
      If you have any questions or problems, contact <a
        href="mailto:aiki.itu.info@gmail.com">aiki.itu.info@gmail.com</a
      >
      for assistance.
    </p>

    <hr />
    <!-- Bootstrap Input field. -->
    <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
    <div class="input-group mb-3">
      <input
        bind:value={user}
        type="text"
        class="form-control"
        placeholder="youremail@example.com"
        aria-label=""
        aria-describedby="basic-addon2"
      />
      <input 
        bind:value={password}
        type="password"
        class="form-control"
        placeholder="CorrectHorseBatteryStaple"
        aria-label=""
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button on:click={logon} class="btn btn-primary" type="button"
          ><Fa icon={faUserPlus} />Log on</button
        >
      </div>
    </div>
  {/if}
</Container>

<style>
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
</style>
