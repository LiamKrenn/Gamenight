<script lang="ts">
	import type Stripe from 'stripe';
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ShoppingBasket, RefreshCw } from 'lucide-svelte';

	export let product: Stripe.Product;
	export let price: Stripe.Price;

	let imageLoaded = false;
	let dialogOpen = false;
  let clicked = false;

	async function checkout() {
    clicked = true;
    const client_secret = await fetch('/shop/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({items: [{price: price.id, quantity: 1}]}),
    })
    window.location.href = (await client_secret.json()).url;
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="border-none bg-slate-700">
		<div class="flex flex-col">
			<div class="rounded-t-lg bg-slate-800/50 p-2">
				{#if product.images.length !== 0}
					<img src={product.images[0]} alt={product.name} class="aspect-[4/3] w-full shrink-0" />
				{:else}
					<div class="aspect-[4/3] w-full shrink-0 animate-pulse rounded-lg bg-slate-800/70" />
				{/if}
			</div>
			<div class="px-2 py-1 xs:px-4 xs:py-2">
				<div class="my-2 flex w-full items-center justify-between">
					<h1 class="text-2xl font-semibold">{product.name}</h1>
					<Button on:click={checkout} variant="secondary" class="bg-sky-700 p-2 hover:bg-sky-800"
						>
            {#if !clicked}
            <ShoppingBasket />
            {:else}
            <RefreshCw class="animate-spin"/>
            {/if}
           </Button
					>
				</div>
				<div class="flex h-fit w-full items-end pb-1">
					<div class="w-full pr-1 text-left">
						{product.description || ''}
					</div>
					<div class="flex h-full w-16 items-end justify-end p-1">
						<p class="text-2xl">{(price.unit_amount || 0) / 100}€</p>
					</div>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>

<button
	on:click={() => {
		dialogOpen = true;
	}}
	class="relative flex h-64 w-52 shrink-0 cursor-pointer flex-col rounded-lg bg-slate-700 hover:scale-[1.02]"
>
	<!-- {#if !imageLoaded && product.images.length !== 0}
    <div class="w-[calc(100%-16px)] aspect-[4/3] rounded-lg bg-slate-600 absolute animate-pulse shrink-0"/>
  {:else if !imageLoaded}
    <div class="w-full aspect-[4/3] rounded-lg bg-slate-600 animate-pulse shrink-0"/>
  {/if} -->
	<div class="aspect-[4/3] w-full bg-slate-800/50 p-1">
		{#if product.images.length !== 0}
			<img
				src={product.images[0]}
				alt={product.name}
				class="aspect-[4/3] w-full shrink-0 rounded-lg"
				on:load={() => {
					imageLoaded = true;
				}}
			/>
		{:else}
			<div class="aspect-[4/3] w-full shrink-0 animate-pulse rounded-lg bg-slate-800/70" />
		{/if}
	</div>

	<div class="h-fulll flex w-full flex-col px-2 pb-1 text-start">
		<h1 class="ml-0.5 mt-1 text-lg font-semibold">{product.name}</h1>
		<div class="ml-0.5 flex w-full grow">
			<div class="card-description w-full pr-1 text-left text-sm">
				{product.description || ''}
			</div>
			<div class="flex h-full w-16 items-end justify-end p-1 pb-0">
				<p class="text-xl">{(price.unit_amount || 0) / 100}€</p>
			</div>
		</div>
	</div>
</button>

<style>
	.card-description {
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3; /* this can be any value you want */
	}
</style>
