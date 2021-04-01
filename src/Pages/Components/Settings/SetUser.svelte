<!-- This component is rendered as a block on the settings page for users to input their UID for logging purposes.-->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from '../../../util/storage'
  import firebase from '../../../util/firebase'
  import { makeDate } from '../../../util/utilities'
  import Fa from 'svelte-fa'
  import { faUserSlash, faUserPlus} from '@fortawesome/free-solid-svg-icons'
  import { toast } from "@zerodevx/svelte-toast";

  export let user = "";
  export let userIsRegistered;
  export let port;

  async function setup() {
    user = await storage.getUid()
    userIsRegistered = (user!=="") ? true : false;
  }
  
  function confirmUid(){
    const confirmation = confirm("Are you certain the provided email is correct?");
    if (confirmation) {
      storage.setUid(user);
      let date = makeDate()
      firebase.addLog({
        user: user,
        event: "Added user ID to storage",
        date: date
      }, "config")
      userIsRegistered = true;
      port.postMessage(`Update: user`);
      toast.push("User registered!");
    }
  }

  function resetUid() {
    const confirmation = confirm("Are you certain you want to reset your email?");
    if (confirmation) {
      firebase.addLog({
        user: user,
        event: "Reset user ID in storage",
        date: makeDate()
      }, "config")
      storage.setUid("");
      userIsRegistered = false;
      user = "";
      port.postMessage(`Update: user`);
      toast.push("User removed!");
    } 
  }
  //We have to save user and userisregistered somewhere globally without losing them each time the page is reloaded...
  setup();

</script>

<SettingsContainer headline="Register UID">
    {#if userIsRegistered}
      <h5>Registered User ID:</h5>
      <input class="form-control" type="text" placeholder={user} readonly>
      <button class="btn btn-danger" on:click={resetUid}><Fa icon={faUserSlash}/> Reset User ID</button>
    {:else}
    <h5>Add your email here so we can log your activity:</h5>
    <hr>
    <p><strong>Note:</strong> Please make sure you enter the correct email you have been using so far for the study. 
      If you provide the incorrect one, your data is likely to become mixed up with another participant.</p>
    <p>Secondly, please note that you may be asked to re-enter your email if you clear your cache or browser history, in order
        for us to resume logging.</p>
    <p>If you have any questions or problems, contact <a href="mailto:aiki.itu.info@gmail.com">aiki.itu.info@gmail.com</a> 
      for assistance.</p>

    <hr>
    <!-- Bootstrap Input field. -->
    <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
    <div class="input-group mb-3">
      <input bind:value={user} type="text" class="form-control" placeholder="Enter your UID here..." aria-label="" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button on:click={confirmUid} class="btn btn-primary" type="button"><Fa icon={faUserPlus}/> Submit</button>
      </div>
    </div>
    {/if}

</SettingsContainer>

<style>

</style>