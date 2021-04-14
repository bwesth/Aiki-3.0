<!-- This component is rendered as a block on the settings page for users to select their chosen learning platforms.-->
<script>
import SettingsContainer from "./SettingsContainer.svelte";
import storage from "../../../util/storage";
import { learningSites } from "../../../util/constants";
import { logConfigEvent } from "../../../util/logger"

// let list = [];
// storage.getLearningSites(data => list = data)

let selected;
storage.getRedirectionSite(data => selected = data)

function changeSite() {
  storage.setRedirectionSite(selected)
  logConfigEvent({
    user: "",
    event: "User changed redirection site",
    site: selected
  })
}

</script>

<SettingsContainer headline="Learning Site">
    <h5>We can recommend these platforms for learning Python:</h5>
    <hr>
    <p>For the purposes of the test we have curated a list of sites which we recommend you use to learn
      Python. They are as follows:
    </p>

    <ul>
    {#each learningSites as site}
      <li><a href="{site}">{site}</a></li>
    {/each}
    </ul>

    <p>Whenever you visit one of these sites, we will log the amount of time you spend there.</p>
</SettingsContainer>

<style>
</style>