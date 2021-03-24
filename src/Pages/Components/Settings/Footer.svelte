<!-- This component is rendered as a block on the settings page as a footer.-->
<script>
    import Fa from 'svelte-fa'
    import { faCopyright } from '@fortawesome/free-solid-svg-icons'
</script>

<footer>IT University of Copenhagen <Fa icon={faCopyright}/> 2021</footer>

<style>
    footer {
        align-self: flex-end;
        text-align: center;
        margin-top: auto;
        margin:0;
        bottom: 0;
        width: 100%;
        padding: 24px 50px;
        color:  #282C34;
        font-size: 14px;
        background: #e8ecf3;
    }
</style>