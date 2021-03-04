<!-- This component is rendered as a block on the settings page for users to input their UID for logging purposes.-->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import storage from '../../../util/storage'
  
  let user = "";
  let userIsRegistered;

  function setup() {
    storage.getUID(uid => {
      user = uid
      if (user!=="") {
        userIsRegistered = true;
      } else {
        userIsRegistered = false;
      }
    });
  }
  
  function confirmUID(){
    const confirmation = confirm("Are you certain the user ID is correct?");
    if (confirmation) {
      storage.setUID(user);
      userIsRegistered = true;
    }
  }

  function resetUID() {
    const confirmation = confirm("Are you certain you want to reset your UID?");
    if (confirmation) {
      storage.setUID("");
      userIsRegistered = false;
      user = "";
    } 
  }

  //We have to save user and userisregistered somewhere globally without losing them each time the page is reloaded...
  setup();

</script>

<h4>Register UID</h4>
<SettingsContainer>
    {#if userIsRegistered}
      <p>Registered User ID: {user}</p>
      <button class="btn btn-danger" on:click={resetUID}>Reset User ID</button>
    {:else}
    <h5>Add your UID here so we can track your usage:</h5>
    <hr>
    <p><strong>Note:</strong> Please make sure you enter the correct UID provided to you by email. If you provide the incorrect one, your
      data will become mixed up with another test participant.</p>
    <p>Secondly, please note that you may be asked to re-enter your UID if you clear your cache or browser history, in order
        for us to resume tracking.</p>
    <p>If you have not recieved a UID, or have misplaced yours, contact <a href="mailto:jhmu@itu.dk">jhmu@itu.dk</a> for assistance</p>

    <hr>
    <!-- Bootstrap Input field. -->
    <!-- https://getbootstrap.com/docs/4.0/components/input-group/ -->
    <div class="input-group mb-3">
      <input bind:value={user} type="text" class="form-control" placeholder="Enter your UID here..." aria-label="" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button on:click={confirmUID} class="btn btn-primary" type="button">Submit</button>
      </div>
    </div>
    {/if}

</SettingsContainer>

<style>

</style>