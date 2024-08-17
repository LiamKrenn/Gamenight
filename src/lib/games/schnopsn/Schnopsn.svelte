<script lang="ts">
	import type { CardType } from '$lib/types';
	import { flip } from 'svelte/animate';
	import Card from '../Card.svelte';

	const defaultSkin = 'default';

	let ownSkin = 'default';
	let opponentSkin = 'default';

	let ownHand: CardType[] = [
		{
			color: 'hearts',
			value: 11,
			skin: ownSkin
		},
		{
			color: 'hearts',
			value: 4,
			skin: ownSkin
		},
		{
			color: 'clubs',
			value: 3,
			skin: ownSkin
		},
		{
			color: 'clubs',
			value: 4,
			skin: ownSkin
		},
		{
			color: 'spades',
			value: 11,
			skin: ownSkin
		}
	];

	let opponentHand: CardType[] = [
		{
			skin: opponentSkin,
			color: undefined,
			value: undefined
		},
		{
			skin: opponentSkin,
			color: undefined,
			value: undefined
		},
		{
			skin: opponentSkin,
			color: undefined,
			value: undefined
		},
		{
			skin: opponentSkin,
			color: undefined,
			value: undefined
		},
		{
			skin: opponentSkin,
			color: undefined,
			value: undefined
		}
	];

	let ownEmptyCard: CardType = {
		skin: ownSkin,
		color: undefined,
		value: undefined
	};

	let opponentEmptyCard: CardType = {
		skin: opponentSkin,
		color: undefined,
		value: undefined
	};

	let stackEmptyCard: CardType = {
		skin: defaultSkin,
		color: undefined,
		value: undefined
	};

	let stackCard: CardType = {
		skin: defaultSkin,
		color: 'spades',
		value: 2
	};

	let stackClosed: boolean = false;

	let ownPlayedCard: CardType | null = null;
	let opponentPlayedCard: CardType | null = null;

	let ownHandDivs: HTMLDivElement[] = [];
	let opponentHandDivs: HTMLDivElement[] = [];

	let ownPlayedCardDiv: HTMLDivElement;
	let opponentPlayedCardDiv: HTMLDivElement;
	let playingAreaDiv: HTMLDivElement;

	function getOwnPlayedCardBB(): DOMRect {
		return ownPlayedCardDiv.getBoundingClientRect();
	}

	function dragCallback(index: number, position: { x: number; y: number }) {
		try {
			const target = getOwnPlayedCardBB();
			const curCoords = ownHandDivs[index].getBoundingClientRect();
      ownPlayedCard = null;
			return { x: target.x - curCoords.x, y: target.y - curCoords.y };
		} finally {
			setTimeout(() => {
				ownPlayedCard = ownHand[index];
				ownHand.splice(index, 1);
				ownHand = [...ownHand];
			}, 150);
		}
	}

	let handWidth = 0;
	$: cardSizeX = handWidth / 4;
	$: cardSizeY = cardSizeX * 1.39;
</script>

<div class="relative flex h-full w-full items-center justify-center overflow-hidden p-0">
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
		<Card parentClass="absolute top-4" card={stackEmptyCard} draggable={false} width={cardSizeX} />
		<Card
			shadow={false}
			parentClass="absolute top-2"
			card={stackEmptyCard}
			draggable={false}
			width={cardSizeX}
		/>
		<Card shadow={false} card={stackEmptyCard} draggable={false} width={cardSizeX} />
	</div>

	<div bind:this={playingAreaDiv} class="flex h-full w-full flex-col items-center justify-between">
		<!-- Opponent Hand -->
		<div
			class="w-[60vmin] h-[{cardSizeY}px] flex max-w-[57%] -space-x-[6%]"
			style="margin-top: -{cardSizeY / 2.4}px"
		>
			{#each opponentHand as card, i}
				<Card
					bind:cardDiv={opponentHandDivs[i]}
					index={i}
					{dragCallback}
					{card}
					draggable={false}
					width={cardSizeX}
				/>
			{/each}
		</div>

		<!-- Played Cards -->
		<div class="flex space-x-6">
			<div bind:this={opponentPlayedCardDiv} class="bg-red-500/20 rounded-lg" style="height: {cardSizeY}px; width: {cardSizeX}px">
				{#if opponentPlayedCard}
					<Card card={opponentPlayedCard} draggable={false} width={cardSizeX} />
				{/if}
			</div>
			<div
				bind:this={ownPlayedCardDiv}
				class="bg-red-500/20 rounded-sm"
				style="height: {cardSizeY}px; width: {cardSizeX}px"
			>
				{#if ownPlayedCard}
					<Card card={ownPlayedCard} draggable={false} width={cardSizeX} />
				{/if}
			</div>
		</div>

		<!-- Own Hand -->
		<div
			bind:clientWidth={handWidth}
			class="w-[60vmin] mb-[2%] flex max-w-[57%] justify-center -space-x-[6%]"
      style="height: {cardSizeY}px"
		>
			{#each ownHand as card, i (card.value + (card.color || 'U'))}
				<div bind:this={ownHandDivs[i]} animate:flip={{duration: 250}}>
					<Card index={i} {dragCallback} {card} draggable={true} width={cardSizeX} />
				</div>
      {/each}
		</div>
	</div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
