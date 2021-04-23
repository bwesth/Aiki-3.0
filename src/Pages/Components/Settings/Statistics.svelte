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
  <p><Fa icon={faClock}/><strong>&nbsp;Time Spent Learning:</strong>{timeSpentLearning}</p>
  <p><Fa icon={faClock}/><strong>&nbsp;Reward Time Earned:</strong>{rewardTimeEarned}</p>
  <p><Fa icon={faCheckCircle}/><strong>&nbsp;Completed Learning Sessions:</strong>{completedLearningSessions}</p>
  <p><Fa icon={faSkull}/><strong>&nbsp;Emergency Skips:</strong>{emergencySkips}</p>
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
