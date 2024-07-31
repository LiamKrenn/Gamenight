<script lang="ts">
	import { page } from '$app/stores';

	export let route: string;
	export let active: string;
	export let inactive: string;

	$: activeRoute = $page.url.pathname === route;
</script>

<a
	href={route}
	class="flex h-16 w-full grow items-center justify-center hover:bg-slate-700/50"
>
		{#if activeRoute}
			{@html active}
		{:else}
			{@html inactive}
		{/if}
</a>
