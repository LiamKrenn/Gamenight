<script lang="ts">
	import { Button } from './ui/button';

	export let id: string | null;
	export let routes: string[][];
</script>

{#each routes as route}
	<a href={route[1]}>
		{#if id == route[1]}
			<Button variant="outline" class="mx-2 h-10 w-24 border-slate-700 bg-slate-700 hover:bg-slate-700"
				>{route[0]}</Button
			>
		{:else}
			<Button
				variant="outline"
				class="mx-2 h-10 w-24 border-slate-700 bg-slate-800 hover:bg-slate-700">{route[0]}</Button
			>
		{/if}
	</a>
{/each}
