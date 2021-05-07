<script>
  import Fa from "svelte-fa";
  import { faHourglass } from "@fortawesome/free-solid-svg-icons";

  let minutes;
  let seconds;
</script>

<select id="inline" class="custom-select custom-select-sm">
  <option selected>Minutes</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>

<select id="inline" class="custom-select custom-select-sm">
  <option selected>Seconds</option>
  <option value="0">00</option>
  <option value="15">15</option>
  <option value="30">30</option>
  <option value="45">45</option>
</select>

<style>
  #inline {
    display: flex;
    flex-direction: row;
    width: 40%;
  }
</style>
