<!-- Popup component that is painted when user clicks the extension icon in chrome extensions menu -->
<!-- This 'enhanced' Popup has extra functionality we will launch with Aiki 3.0 -->

<script>
    import browser from "webextension-polyfill";
      import Input from './Components/Input.svelte';
      let list;
      chrome.storage.sync.get("list", function (data) {
          list = data.list;
          console.log(list);
      });
      function setList() {
        chrome.storage.sync.set({ list: list }, function (value) {
          console.log(value);
        });
        console.log(list)
    }
  
  /* Opens a new tab with settings page and selects it */
    function openSettingsPage () {
      chrome.management.getSelf(result => {
            chrome.tabs.create({
                active: true,
                url: result.optionsUrl
            })
        })
    }
  
  </script>
  
  <main>
    <div class="popup">
      <!-- Using bootstraps flexbox rules here. -->
      <!-- https://getbootstrap.com/docs/4.0/utilities/flex/ -->
      <div class="d-flex flex-row justify-content-start">
        <div class="p-2">
          <img src='images/aikido.png' class="popupLogo" alt="logo" />
        </div>
        <div class="p-2">
          <h5>Aiki</h5>
        </div>
      </div>
  
      <hr> 
  
      <!-- Opens settings page. -->
      <div class="d-flex flex-row justify-content-center">
        <div class="p-2">
          <p>Settings:</p>
        </div>
        <div class="p-2">
          <button type="default" class="btn btn-primary" on:click={openSettingsPage}>Click Me</button>
        </div>
      </div>
  
      <hr>
  
      <div class="d-flex flex-row justify-content-center">
        <div class="p-2">
          <p>Total Study Sessions:</p>
        </div>
        <div class="p-2">
          <p class="statText">x sessions</p>
        </div>
      </div>
  
      <hr>
  
      <div class="d-flex flex-row justify-content-center">
        <div class="p-2">
          <p>Total Study Time:</p>
        </div>
        <div class="p-2">
          <p class="statText">x sessions</p>
        </div>
      </div>
  
      <hr>
  
      <div class="d-flex flex-row justify-content-center">
        <div class="p-2">
          <button type="default" class="btn btn-success">Continue to Your Site</button>
        </div>
      </div>
  
      <hr>
  
      <div class="d-flex flex-row justify-content-center">
        <div class="p-2">
          <button type="default" class="btn btn-light">Emergency Skip</button>
        </div>
      </div>
  
  
    </div>
  </main>
  
  <style>
  </style>