<script lang="ts">
	import { goto } from '$app/navigation';
    import { page } from '$app/stores'
	import { onMount } from 'svelte';

    onMount(async () => {
      await fetch(`https://ezauthtesting.jjhost.at/oauth/google/callback${$page.url.search}`)
      goto('/')
    })
</script>

<div>
  asdfasd
</div>