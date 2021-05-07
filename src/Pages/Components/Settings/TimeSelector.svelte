<script>
  //Accepts two arrays of values and a third array of labels for said values.
  export let firstValues;
  export let secondValues;
  export let labels;
</script>

<div class="wrapper">
  <select class="custom-select custom-select-sm inline">
    <optgroup label="{labels[0]}">
      {#each firstValues as value}
        <option value={value}>{value}</option>
      {/each}
    </optgroup>
  </select>

  <select class="custom-select custom-select-sm inline">
    <optgroup label="{labels[1]}">
      {#each secondValues as value}
        <option value={value}>{value}</option>
      {/each}
    </optgroup>
  </select>

  <p><small>{labels[2]}</small></p>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .inline {
    display: inline !important;
    width: 25%;
    margin: 0px 5px 20px 0px;
  }

  p {
    display: inline;
    padding: 0;
    margin: 0px 5px 20px 0px;
  }
</style>
