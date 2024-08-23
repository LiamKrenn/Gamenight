<script lang="ts">
	import { onMount } from 'svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';

	let mainArea: HTMLDivElement;
	onMount(() => {
		const osInstance = OverlayScrollbars(mainArea, {
			overflow: {
				x: 'hidden',
				y: 'scroll'
			},
			scrollbars: {
				theme: 'os-theme-default'
			}
		});
	});
</script>

<div bind:this={mainArea} class="h-full w-full">
	<slot />
</div>
