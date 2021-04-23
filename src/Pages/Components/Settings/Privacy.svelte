<!-- 

  Used in / Parent components: /src/Pages/Settings.svelte
 -->
<script>
import SettingsContainer from "./SettingsContainer.svelte";
</script>

<SettingsContainer headline="Your Privacy">
<h5>We want you to know we take your privacy very seriously:</h5>
<hr>
<p>For the duration of this study, Aiki will be logging the amount of time you spend on websites that
    you add to it as procrastination sites. However, Aiki will only log the time spent (in seconds) on each 
    procrastination site, nothing more. Aiki will not know anything about any webpages you do not add to it.
    As for the the content of the pages you do add, only the name of the root site (ie: Youtube.com, 
    Facebook.com, etc) will be logged.</p>

<p><strong>For example:</strong> You added Facebook.com as a procrastination site to Aiki. You then visited 
    Facebook for 45 seconds on Tuesday. Aiki would log that you spent 45 seconds on Facebook.com on Tuesday, 
    but absolutely nothing else. To be clear, Aiki will not know anything about the content of the pages you 
    visit. We will later use this data to see if Aiki helped you to procrastinate a little less.</p>
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