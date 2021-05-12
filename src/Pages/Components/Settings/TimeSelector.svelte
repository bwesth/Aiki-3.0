<script>
  //Accepts two arrays of values and a third array of labels for said values.
  export let firstValues;
  export let secondValues;
  export let labels;
  export let values;
  export let onChange;
  export let ids;

  function parse(number) {
    return number < 9 ? `0${number}` : number;
  }
</script>

<div class="wrapper">
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    selected={values[0]}
    id={ids[0]}
    on:change={onChange}
    class="custom-select custom-select-sm inline"
  >
    <optgroup label={labels[0]}>
      {#each firstValues as value}
        <option selected={value === values[0]} {value}>{parse(value)}</option>
      {/each}
    </optgroup>
  </select>
<p>:</p>
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    id={ids[1]}
    on:change={onChange}
    class="custom-select custom-select-sm inline"
  >
    <optgroup label={labels[1]}>
      {#each secondValues as value}
        <option selected={value === values[1]} {value}>{parse(value)}</option>
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
