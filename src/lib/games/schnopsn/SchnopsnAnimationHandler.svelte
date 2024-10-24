<script lang="ts">
	import { flip } from 'svelte/animate';
	import Card from '../Card.svelte';
	import {
		cardSizeX,
		cardSizeY,
		opponentHandDivs,
		opponentPlayedCardDiv,
		ownHandDivs,
		ownPlayedCardDiv,
		cancelDropzoneDiv,
		stackDropzoneDiv,
		playCardDropzoneDiv,
		stackCardDiv,
		stackCardWrapperDiv,
		blockUI
	} from './SchnopsnUI';

	import { getBB, gotoElement, wait, isWithin, gotoCoords } from './SchnopsnAnimation';
	import SchnopsnLayout from './SchnopsnLayout.svelte';
	import type { CardType } from '$lib/types';
	import schnopsn from './Schnopsn';

	const {
		opponentHand,
		opponentPlayedCard,
		opponentEmptyCard,
		opponentSkin,
		opponentTricks,
		ownEmptyCard,
		ownHandUnsorted,
		ownPlayedCard,
		ownSkin,
		ownTricks,
		stackCard,
		stackClosed,
		stackEmptyCard
	} = schnopsn;

	let stackCardPos = { x: 0, y: 0 };
	let stackStyles = 'z-index: 0;';
	let stackCardRotation = 90;
	let resetStack: (rotate: number) => Promise<void> = async () => {};

	let ownHandUI: CardType[] = [];

	const colorSort = ['hearts', 'diamonds', 'clubs', 'spades'];
	ownHandUnsorted.subscribe((value) => {
		setTimeout(() => {
			ownHandUI = $ownHandUnsorted.sort((a, b) => {
				const colorComparison =
					colorSort.indexOf(a.color || 'hearts') - colorSort.indexOf(b.color || 'hearts');
				if (colorComparison !== 0) {
					return colorComparison;
				}
				return (a.value || 0) - (b.value || 0);
			});
		}, 150);
	});

	let currentlyPlayingAnimation = false;
	async function dragCallback(
		index: number,
		position: { x: number; y: number },
		combi: boolean = false
	): Promise<{ x: number; y: number; rotate: number } | void> {
		if ($blockUI) return;
		try {
			if (
				currentlyPlayingAnimation ||
				!$ownPlayedCardDiv ||
				!$cancelDropzoneDiv ||
				!$stackDropzoneDiv ||
				!$playCardDropzoneDiv
			)
				return;
			currentlyPlayingAnimation = true;

			if (isWithin($ownHandDivs[index], $stackDropzoneDiv, position) && !combi) {
				if (!$stackCardDiv || !$stackCardWrapperDiv) return;
				const stackBB = getBB($stackCardDiv);
				const cardBB = getBB($ownHandDivs[index]);
				stackCardRotation = 0;
				stackStyles = 'z-index: ' + index + ';';
				stackCardPos = { x: cardBB.x - stackBB.x, y: cardBB.y - stackBB.y };
				let newPosition = (await gotoElement($ownHandDivs[index], $stackCardWrapperDiv, 150, {
					beforeAnimation: () => {},
					afterAnimation: async () => {
						if (!$stackCardDiv) return;
						const playedCard = ownHandUI[index];
						ownHandUI[index] = $stackCard;
						const unsortedIndex = $ownHandUnsorted.findIndex((card) => card === playedCard);
						$ownHandUnsorted[unsortedIndex] = $stackCard;
						stackCardRotation = 0;
						$stackCard = playedCard;
						resetStack(90);
						stackCardRotation = 90;
						stackStyles = 'z-index: 0;';
						// TODO: swap card for real
					},
					returnNewPosition: true
				})) || { x: 0, y: 0 };
				return {
					x: newPosition.x,
					y: newPosition.y,
					rotate: 90
				};
			} else if (isWithin($ownHandDivs[index], $cancelDropzoneDiv, position)) {
				return;
			} else if (isWithin($ownHandDivs[index], $playCardDropzoneDiv, position)) {
				if (!$ownPlayedCardDiv) return;

				let newPosition = (await gotoElement($ownHandDivs[index], $ownPlayedCardDiv, 150, {
					beforeAnimation: () => {
						$ownPlayedCard = null;
					},
					afterAnimation: async () => {
						$ownPlayedCard = ownHandUI[index];
						ownHandUI.splice(index, 1);
						ownHandUI = [...ownHandUI];
						await wait(100);
						currentlyPlayingAnimation = false;
						// TODO: play card for real
					},
					returnNewPosition: true
				})) || { x: 0, y: 0 };
				return {
					x: newPosition.x,
					y: newPosition.y,
					rotate: 0
				};
			}
		} finally {
			currentlyPlayingAnimation = false;
			$blockUI = false;
		}
	}
</script>

<SchnopsnLayout>
	<!-- Opponent Hand -->
	<svelte:fragment slot="opponentHand">
		{#each $opponentHand as card, i}
			<Card
				bind:cardDiv={$opponentHandDivs[i]}
				index={i}
				{dragCallback}
				{card}
				draggable={false}
				width={$cardSizeX}
			/>
		{/each}
	</svelte:fragment>

	<!-- Opponent Played Card -->
	<svelte:fragment slot="opponentPlayedCard">
		{#if $opponentPlayedCard}
			<Card card={$opponentPlayedCard} draggable={false} width={$cardSizeX} />
		{:else}
			<p class="opacity-10">Opp.</p>
		{/if}
	</svelte:fragment>

	<!-- Own Played Card -->
	<svelte:fragment slot="ownPlayedCard">
		{#if $ownPlayedCard}
			<Card card={$ownPlayedCard} draggable={false} width={$cardSizeX} />
		{:else}
			<p class="opacity-10">Own</p>
		{/if}
	</svelte:fragment>

	<!-- Stack -->
	<svelte:fragment slot="stack">
		<div
			bind:this={$stackCardWrapperDiv}
			style="height: {$cardSizeY}px; width: {$cardSizeX}px; left: 54%;"
			class="absolute mt-3"
		>
			<div bind:this={$stackCardDiv}>
				<Card
					bind:reset={resetStack}
					card={$stackCard}
					draggable={false}
					position={stackCardPos}
					width={$cardSizeX}
					rotate={stackCardRotation}
					style={stackStyles}
					class="stackcard"
				/>
			</div>
		</div>
		<Card
			parentClass="absolute top-4 z-50"
			card={$stackEmptyCard}
			draggable={false}
			width={$cardSizeX}
		/>
		<Card
			shadow={false}
			parentClass="absolute top-2 z-50"
			card={$stackEmptyCard}
			draggable={false}
			width={$cardSizeX}
		/>
		<Card
			parentClass="z-50"
			shadow={false}
			card={$stackEmptyCard}
			draggable={false}
			width={$cardSizeX}
		/>
	</svelte:fragment>

	<!-- Own Hand -->
	<svelte:fragment slot="ownHand">
		{#each ownHandUI as card, i (card.value + (card.color || 'U'))}
			<div class="duration-150" bind:this={$ownHandDivs[i]} animate:flip={{ duration: 250 }}>
				<Card index={i} {dragCallback} {card} draggable={true} width={$cardSizeX} {ownHandUI} />
			</div>
		{/each}
	</svelte:fragment>
</SchnopsnLayout>
