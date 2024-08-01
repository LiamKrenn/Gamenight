<script lang="ts">
	let className: string = '';
	export { className as class };
	export let open = false;
</script>

<div
	class="{className} absolute !z-30 h-full w-full ease-in-out xs:max-w-96 {open
		? 'left-0'
		: '-left-[550px]'}"
>
	<div class="absolute h-full w-full border-slate-700 bg-slate-800 duration-150 xs:border-r-2 overflow-scroll">
		<slot />
	</div>
</div>
