<script lang="ts">
	import { onMount } from 'svelte';
	import SchnopsnAnimationHandler from './SchnopsnAnimationHandler.svelte';
	import schnopsn from './Schnopsn';
	import { schnopsnConnection } from './SchnopsnConnection';

	function buttonClicked() {
		console.log('Button clicked');
	}
	onMount(() => {});
</script>

<!-- <button on:click={buttonClicked} class="bg-slate-600 p-2">Test</button> -->
{#if schnopsnConnection.inMatch || true}
	<SchnopsnAnimationHandler />
{:else}
	<div class="flex h-full w-full items-center justify-center">
		{#if schnopsnConnection.searching}
			<p>Searching for match...</p>
		{:else}
			<button on:click={schnopsnConnection.findMatch}>Find Match</button>
		{/if}
	</div>
{/if}
