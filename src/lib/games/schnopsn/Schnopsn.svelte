<script lang="ts">
	import type { CardType } from '$lib/types';
	import Card from '../Card.svelte';

	let mockupOwnHand: CardType[] = [
		{
			color: 'hearts',
			value: 11,
			skin: 'default'
		},
		{
			color: 'hearts',
			value: 4,
			skin: 'default'
		},
		{
			color: 'clubs',
			value: 3,
			skin: 'default'
		},
		{
			color: 'clubs',
			value: 4,
			skin: 'default'
		},
		{
			color: 'spades',
			value: 11,
			skin: 'default'
		}
	];

	let mockupOpponentHand: CardType[] = [
		{
			skin: 'default',
			color: undefined,
			value: undefined
		},
		{
			skin: 'default',
			color: undefined,
			value: undefined
		},
		{
			skin: 'default',
			color: undefined,
			value: undefined
		},
		{
			skin: 'default',
			color: undefined,
			value: undefined
		},
		{
			skin: 'default',
			color: undefined,
			value: undefined
		}
	];

  let handWidth = 0;
  $: cardSizeX = handWidth / 5;
  $: cardSizeY = cardSizeX * 1.39;
</script>

<div bind:clientWidth={handWidth} class="h-full w-full overflow-hidden p-4 relative flex justify-center">
  <div class="w-[800px] h-[{cardSizeY}px] max-w-[90%] absolute xs:-top-16 top-8 flex space-x-[-50px]">
    {#each mockupOpponentHand as card}
       <Card {card} draggable={false} />
    {/each}
  </div>
  <div class="w-[800px] h-[{cardSizeY}px] max-w-[90%] absolute bottom-16 flex space-x-[-50px]">
    {#each mockupOwnHand as card}
       <Card {card} draggable={true} />
    {/each}
  </div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
