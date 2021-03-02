<script>
  export let value = "";
  const onInput = e => (value = e.target.value);
</script>

<input {value} on:input={onInput} />