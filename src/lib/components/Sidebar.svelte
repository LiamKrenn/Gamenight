<script lang="ts">
	import 'overlayscrollbars/overlayscrollbars.css';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { onMount } from 'svelte';
	let className: string = '';
	export { className as class };
	export let open = false;

	let mainArea: HTMLDivElement;
	onMount(() => {
		const osInstance = OverlayScrollbars(mainArea, {});
	});
</script>

<div
	class="{className} absolute !z-30 h-full w-full ease-in-out xs:max-w-96 {open
		? 'left-0'
		: '-left-[550px]'}"
>
	<div
		bind:this={mainArea}
		class="cscroll absolute h-full w-full overflow-y-auto overflow-x-hidden border-slate-700 bg-slate-800 duration-150 xs:border-r-2"
	>
		<slot />
	</div>
</div>
