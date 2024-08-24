<script lang="ts">
	import Category from './Category.svelte';

	export let data;
</script>

<div class="h-full w-full px-[8%] py-8 mobile:px-[20%]">
	{#each data.productsByCategory as category}
		<Category {category} prices={data.prices} />
	{/each}
</div>
