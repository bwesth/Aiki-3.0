<!-- 
  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
  import SettingsContainer from "./SettingsContainer.svelte";
  import Fa from "svelte-fa";
  import { faClock, faCheckCircle, faSkull } from "@fortawesome/free-solid-svg-icons";

  let timeSpentLearning = 0;
  let rewardTimeEarned = 0;
  let completedLearningSessions = 0;
  let emergencySkips = 0;

</script>

<SettingsContainer headline="Statistics">
  <h5>Your Statistics:</h5>
  <hr />
  <p>Here's a small collection of statistics on how you use Aiki.</p>
  <p><Fa icon={faClock}/><strong>-Time Spent Learning:</strong>&nbsp;seconds{timeSpentLearning}</p>
  <p><Fa icon={faClock}/><strong>-Reward Time Earned:</strong>&nbsp;seconds{rewardTimeEarned}</p>
  <p><Fa icon={faCheckCircle}/><strong>-Completed Learning Sessions:</strong>&nbsp;seconds{completedLearningSessions}</p>
  <p><Fa icon={faSkull}/><strong>-Emergency Skips:</strong>&nbsp;{emergencySkips}</p>
</SettingsContainer>

<style>
  h5 {
    font-family: 'Roboto', sans-serif;
  }

  p {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
  }
</style>
