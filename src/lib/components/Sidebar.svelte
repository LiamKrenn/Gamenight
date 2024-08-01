<script lang="ts">
	let className: string = '';
	export { className as class };
	export let open = false;
</script>

<div
	class="{className} fixed !z-30 h-full w-full ease-in-out xs:max-w-96 {open
		? 'left-0'
		: 'invisible -left-full xs:-left-96'}"
>
	<div class="absolute h-full w-full border-slate-700 bg-slate-800 duration-150 xs:border-r-2">
		<slot />
	</div>
</div>
