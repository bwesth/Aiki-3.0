<script>
  // Functional and module imports
  import Fa from "svelte-fa";
  import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
  import storage from "../../../util/storage";

  let fromTime = storage.activeTime.from.get();
  let toTime = storage.activeTime.to.get();

  const changeSettings = {
    from: () => {
      storage.activeTime.from.get(fromTime);
    },
    to: () => {
      storage.activeTime.to.get(toTime);
    },
  };
</script>

{#await fromTime}
  <p>Loading...</p>
{:then value}
  <div class="input-group input-group-sm mb-3">
    <input
      {value}
      on:change={changeSettings.from}
      type="number"
      class="form-control"
      aria-label="Small"
      aria-describedby="inputGroup-sizing-sm"
    />
    <div class="input-group-append">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        ><Fa icon={faHourglassHalf} />&nbsp;seconds</span
      >
    </div>
  </div>
{/await}

{#await toTime}
  <p>Loading...</p>
{:then value}
  <div class="input-group input-group-sm mb-3">
    <input
      {value}
      on:change={changeSettings.to}
      type="number"
      class="form-control"
      aria-label="Small"
      aria-describedby="inputGroup-sizing-sm"
    />
    <div class="input-group-append">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        ><Fa icon={faHourglassHalf} />&nbsp;seconds</span
      >
    </div>
  </div>
{/await}
