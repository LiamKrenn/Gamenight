<script lang="ts">
	let className: string = '';
	export { className as class };
	export let open = false;
</script>

<div class="{className} absolute !z-30 h-full w-full xs:max-w-96">
	<div
		class="absolute h-full w-full border-slate-700 bg-slate-800 duration-150 ease-in-out xs:border-r-2
    {open ? 'left-0' : 'invisible -left-full'}"
	>
		<slot />
	</div>
</div>
