<script lang="ts">
	let className: string = '';
	export { className as class };
	export let openSidebar: boolean;
</script>

<div class="{className} absolute !z-30 h-full">
	<div
		class="absolute h-full w-full xs:border-r-2 border-slate-700 bg-slate-800 duration-150 ease-in-out
    {openSidebar ? 'left-0' : '-left-full'}"
	>
		<slot />
	</div>
</div>
