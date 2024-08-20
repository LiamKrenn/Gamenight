<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { openSidebar } from '$lib/stores';
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

<Sheet.Root bind:open={$openSidebar} closeOnOutsideClick={false}>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" class="hidden"></Button>
	</Sheet.Trigger>
	<Sheet.Content
		class="!z-10 mt-16 h-[calc(100%-128px)] w-full max-w-full border-r-0 border-slate-700 bg-slate-800 p-0 xs:w-96 xs:border-r-2 mobile:h-[calc(100%-64px)]"
		side={'left'}
	>
		<div bind:this={mainArea} class="h-full w-full">
			<slot />
		</div>
	</Sheet.Content>
</Sheet.Root>
