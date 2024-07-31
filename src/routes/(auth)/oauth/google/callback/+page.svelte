<script lang="ts">
    import { page } from '$app/stores'
    fetch(`https://ezauthtesting.jjhost.at/oauth/google/callback${$page.url.search}`)
</script>