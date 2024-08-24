<script lang="ts">
	import { onMount } from 'svelte';
	import Product from './Product.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import Stripe from 'stripe';

	export let category: {
		category: string;
		products: Stripe.Product[];
	};
	export let prices;

	let scrollArea: HTMLDivElement;

	onMount(() => {
		const osInstance = OverlayScrollbars(scrollArea, {
			overflow: {
				x: 'scroll',
				y: 'hidden'
			},
			scrollbars: {
				theme: 'os-theme-shop'
			}
		});
	});
</script>

<h1 class="mb-4 text-3xl font-semibold">{category.category}</h1>
<div bind:this={scrollArea} class="mb-6 space-x-4 overflow-y-hidden overflow-x-scroll p-1">
	<div class="mb-4 flex space-x-4">
		{#each category.products as product}
			<Product {product} price={prices[product.default_price?.toString() || '']} />
		{/each}
	</div>
</div>

<style>
	:global(.os-theme-shop) {
		--os-size: 16px;
		--os-padding-perpendicular: 3px;
		--os-padding-axis: 0;
		--os-handle-bg: #334155;
		--os-handle-bg-hover: #334155;
		--os-handle-bg-active: #334155;
		--os-handle-interactive-area-offset: 10px;
		--os-handle-border-radius: 0.5rem;
		--os-handle-min-size: 64px;
		--os-handle-max-size: 320px;
		margin-left: 4px !important;
	}
</style>
