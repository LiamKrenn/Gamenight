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
	$: cardSizeX = handWidth / 4;
	$: cardSizeY = cardSizeX * 1.39;
</script>

<div
	
	class="relative flex h-full w-full justify-center items-center overflow-hidden p-4"
>
  <!-- Opponent Hand -->
  <div bind:clientWidth={handWidth} class="w-[800px] h-[{cardSizeY}px] absolute top-8  xs:-top-16 flex max-w-[57%]">
		{#each mockupOpponentHand as card}
			<Card {card} draggable={false} width={cardSizeX} style="margin-right: -{cardSizeX / 4}px" />
		{/each}
	</div>

  <!-- Stack -->
   <div class="absolute -left-8 mobile:left-[4%] xl:left-16  mb-24">
    <Card parentClass="absolute mt-3" style="left: {cardSizeY / 2.55}px" rotate={90} card={stackCard} draggable={false} width={cardSizeX} />
    <Card parentClass="absolute top-4" card={emptyCard} draggable={false} width={cardSizeX} />
    <Card shadow={false} parentClass="absolute top-2" card={emptyCard} draggable={false} width={cardSizeX} />
    <Card shadow={false} card={emptyCard} draggable={false} width={cardSizeX} />
   </div>

  <!-- Own Hand -->
	<div bind:clientWidth={handWidth} class="w-[800px] h-[{cardSizeY}px] absolute bottom-16 flex max-w-[57%]">
		{#each mockupOwnHand as card}
			<Card {card} draggable={true} width={cardSizeX} style="margin-right: -{cardSizeX / 4}px" />
		{/each}
	</div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
