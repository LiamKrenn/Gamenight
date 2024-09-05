<script lang="ts">
	import SchnopsnAnimationHandler from './SchnopsnAnimationHandler.svelte';

	function buttonClicked() {
		console.log('Button clicked');
	}

	function playedCardCallback(index: number): Promise<boolean> {
		return Promise.resolve(true);
	}

	function swapCardCallback(index: number): Promise<boolean> {
		return Promise.resolve(true);
	}
</script>

<!-- <button on:click={buttonClicked} class="bg-slate-600 p-2">Test</button> -->
<SchnopsnAnimationHandler {playedCardCallback} {swapCardCallback} />
