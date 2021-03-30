<script>
import SettingsContainer from "./SettingsContainer.svelte";
</script>

<SettingsContainer headline="Your Privacy">
<h5>We want you to know we take your privacy very seriously:</h5>
<hr>

<p>For the duration of this study, we will be logging the amount of time you spend on websites that you add 
    to the extension as procrastination sites. However, we will only log the time spent (in seconds) on each 
    site, nothing more. We will not know anything about the content of those pages, only name of the root 
    site (ie: Youtube.com, Facebook.com).</p>

<p><strong>For example:</strong> The extension logs that you spent 45 seconds on Facebook.com on Tuesday, but 
    absolutely nothing about the content of the Facebook pages you had open. We will later use this data to 
    see if our extension helped you to procrastinate a little less.</p>

<p>In an effort to increase security, we will be generating a unique User ID from your email which 
    is a unique number that we will use to identify you. Your data will be stored with this UID, 
    not your email. No one but the research team will know which UID links to which email, rendering 
    your data anonymous to anyone else. Your real identity will never be used or mentioned in any of 
    the following research.</p>
</SettingsContainer>

<style>

</style>