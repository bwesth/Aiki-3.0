<!-- 
  TODO: Description goes here
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import storage from "../../../util/storage";
  import firebase from "../../../util/firebase";
  import { makeDate } from "../../../util/utilities";

  let hourOptions = Array.from({ length: 25 }, (_, i) => i);
  let minuteOptions = [0, 15, 30, 45];

  export let settings;
  export let update;
  export let user;

  let { hrs: hrsFrom, min: minFrom } = settings.activeFrom;
  let { hrs: hrsTo, min: minTo } = settings.activeTo;

  function parseNumberToTime(number) {
    return number < 10 ? `0${number}` : number;
  }

  function setActiveTo() {
    const setting = { hrs: hrsTo, min: minTo };
    storage.operatingHours.to.set(setting);
    firebase.addLog(
      {
        user: user,
        event: "User changed operating hours in settings",
        operatingHoursTo: setting,
        date: makeDate(),
      },
      "config"
    );
    update();
  }

  function setActiveFrom() {
    if (hrsTo < hrsFrom) {
      hrsTo = hrsFrom === 24 ? hrsFrom : hrsFrom + 1;

      storage.operatingHours.from.set({ hrs: hrsTo, min: minTo });
    }
    const setting = { hrs: hrsFrom, min: minFrom };
    storage.operatingHours.from.set(setting);
    firebase.addLog(
      {
        user: user,
        event: "User changed operating hours in settings",
        operatingHoursFrom: setting,
        date: makeDate(),
      },
      "config"
    );
    update();
  }

  function hrsToDisabled(value) {
    const threshhold = hrsFrom * 60 + minFrom;
    const target = value * 60 + minTo;
    if (threshhold >= target) return true;
  }
  function minToDisabled(value) {
    const threshhold = hrsFrom * 60 + minFrom;
    const target = hrsTo * 60 + value;
    if (threshhold >= target) return true;
  }
</script>

<!-- ActiveFrom -->
<div class="row">
  <div class="col-sm">
    <p>Aiki will turn <strong>ON</strong> at this time:</p>
  </div>
  <div class="col-sm" />
  <div class="col-sm">
    <div class="wrapper">
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        selected={hrsFrom}
        id="hrs"
        on:change={(e) => {
          hrsFrom = parseInt(e.target.value);
          setActiveFrom();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each hourOptions as value}
          <option selected={value === hrsFrom} {value}
            >{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p>:</p>
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        selected={minFrom}
        id="min"
        on:change={(e) => {
          minFrom = parseInt(e.target.value);
          setActiveFrom();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each minuteOptions as value}
          <option
            disabled={hrsFrom === 0 && value === 0}
            selected={value === minFrom}
            {value}>{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p><small>{"Hrs/Min"}</small></p>
    </div>
  </div>
</div>

<!-- ActiveTo -->
<div class="row">
  <div class="col-sm">
    <p class="header-p">Aiki will turn <strong>OFF</strong> at this time:</p>
  </div>
  <div class="col-sm" />
  <div class="col-sm">
    <!-- svelte-ignore a11y-no-onchange -->
    <div class="wrapper">
      <select
        selected={hrsTo}
        id="hrs"
        on:change={(e) => {
          hrsTo = parseInt(e.target.value);
          setActiveTo();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each hourOptions as value}
          <option
            disabled={hrsToDisabled(value)}
            selected={value === hrsTo}
            {value}>{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p>:</p>
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        selected={minTo}
        id="min"
        on:change={(e) => {
          minTo = parseInt(e.target.value);
          setActiveTo();
        }}
        class="custom-select custom-select-sm inline"
      >
        {#each minuteOptions as value}
          <option
            disabled={minToDisabled(value)}
            selected={value === minTo}
            {value}>{parseNumberToTime(value)}</option
          >
        {/each}
      </select>
      <p><small>{"Hrs/Min"}</small></p>
    </div>
  </div>
</div>

<style>
  .inline {
    display: inline !important;
    width: 25%;
    min-width: 55px;
    margin: 0px 5px 20px 0px;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  p {
    display: inline;
    padding: 0;
    margin: 0px 5px 20px 0px;
    font-family: var(--fontContent);
    font-size: var(--fontSizeSettings);
  }

  select,
  option {
    font-family: var(--fontContent);
    font-size: 0.875rem;
    color: #212121;
  }

  option:disabled {
    background-color: whitesmoke;
    color: lightgray;
  }
</style>
