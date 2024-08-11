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
	};

	let stackCard: CardType = {
		skin: 'default',
		color: 'spades',
		value: 2
	};

	let handWidth = 0;
	$: cardSizeX = handWidth / 4;
	$: cardSizeY = cardSizeX * 1.39;
</script>

<div class="relative flex h-full w-full items-center justify-center overflow-hidden p-4">
	<!-- Opponent Hand -->
	<div
		class="w-[60vmin] h-[{cardSizeY}px] absolute flex max-w-[57%] -space-x-[6%]"
		style="top: -{cardSizeY / 2.4}px"
	>
		{#each mockupOpponentHand as card}
			<Card {card} draggable={false} width={cardSizeX} />
		{/each}
	</div>

	<!-- Stack -->
	<div
		class="absolute mobile:left-[4%]"
		style="left: -{cardSizeX / 2}px; margin-bottom: {cardSizeY / 2}px"
	>
		<div class="absolute left-[54%] mt-3 rotate-90">
			<Card
				style="left: {cardSizeY / 2.55}px"
				card={stackCard}
				draggable={false}
				width={cardSizeX}
			/>
		</div>
		<Card parentClass="absolute top-4" card={emptyCard} draggable={false} width={cardSizeX} />
		<Card
			shadow={false}
			parentClass="absolute top-2"
			card={emptyCard}
			draggable={false}
			width={cardSizeX}
		/>
		<Card shadow={false} card={emptyCard} draggable={false} width={cardSizeX} />
	</div>

	<!-- Own Hand -->
	<div
		bind:clientWidth={handWidth}
		class="w-[60vmin] h-[{cardSizeY}px] absolute bottom-[5%] flex max-w-[57%] -space-x-[6%]"
	>
		{#each mockupOwnHand as card}
			<Card {card} draggable={true} width={cardSizeX} />
		{/each}
	</div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
