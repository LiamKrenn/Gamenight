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

  let emptyCard: CardType = {
    skin: 'default',
    color: undefined,
    value: undefined
  }

  let stackCard: CardType = {
    skin: 'default',
    color: 'spades',
    value: 2
  }

	let handWidth = 0;
	$: cardSizeX = handWidth / 5;
	$: cardSizeY = cardSizeX * 1.39;
</script>

<div
	bind:clientWidth={handWidth}
	class="relative flex h-full w-full justify-center items-center overflow-hidden p-4"
>
  <!-- Opponent Hand -->
	<div
		class="w-[800px] h-[{cardSizeY}px] absolute top-8 flex max-w-[57%] space-x-[-50px] xs:-top-16"
	>
		{#each mockupOpponentHand as card}
			<Card {card} draggable={false} width={cardSizeX} />
		{/each}
	</div>

  <!-- Stack -->
 

  <!-- Own Hand -->
	<div class="w-[800px] h-[{cardSizeY}px] absolute bottom-16 flex max-w-[57%] space-x-[-50px]">
		{#each mockupOwnHand as card}
			<Card {card} draggable={true} width={cardSizeX} height={cardSizeY}  />
		{/each}
	</div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
