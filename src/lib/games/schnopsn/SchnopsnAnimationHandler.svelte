<script lang="ts">
	import { flip } from 'svelte/animate';
	import Card from '../Card.svelte';
	import {
		opponentEmptyCard,
		opponentHand,
		opponentPlayedCard,
		opponentSkin,
		ownEmptyCard,
		ownHand,
		ownHandSorted,
		ownPlayedCard,
		ownSkin,
		stackCard,
		stackClosed,
		stackEmptyCard,
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
		currentlyDragging
	} from './Schnopsn';
	import { getBB, gotoElement, wait, isWithin } from './SchnopsnAnimation';
	import SchnopsnLayout from './SchnopsnLayout.svelte';
	import type { CardType } from '$lib/types';

	export let swapCardCallback: (index: number) => Promise<boolean> = () => {
		return Promise.resolve(true);
	};

	export let playedCardCallback: (index: number) => Promise<boolean> = () => {
		return Promise.resolve(true);
	};

	let stackCardPos = { x: 0, y: 0 };
	let stackStyles = '';
	let stackCardRotation = 90;
	let resetStack: (rotate: number) => Promise<void> = async () => {};

	let currentlyPlayingAnimation = false;
	async function dragCallback(
		index: number,
		position: { x: number; y: number }
	): Promise<{ x: number; y: number; rotate: number } | void> {
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

			if (isWithin($ownHandDivs[index], $stackDropzoneDiv, position)) {
				if (!$stackCardDiv || !$stackCardWrapperDiv) return;
				if (await swapCardCallback(index)) {
					const stackBB = getBB($stackCardDiv);
					const cardBB = getBB($ownHandDivs[index]);

					stackCardRotation = 0;
					stackStyles = 'z-index: ' + index + ';';
					stackCardPos = { x: cardBB.x - stackBB.x, y: cardBB.y - stackBB.y };

					let newPosition = (await gotoElement($ownHandDivs[index], $stackCardWrapperDiv, 150, {
						beforeAnimation: () => {},
						afterAnimation: async () => {
							if (!$stackCardDiv) return;
							const playedCard = $ownHand[index];
							$ownHandSorted[index] = $stackCard;
							$ownHand[index] = $stackCard;
							stackCardRotation = 0;
							$stackCard = playedCard;
							resetStack(90);
							stackCardRotation = 90;
							stackStyles = '';
						},
						returnNewPosition: true
					})) || { x: 0, y: 0 };

					return {
						x: newPosition.x,
						y: newPosition.y,
						rotate: 90
					};
				}
			} else if (isWithin($ownHandDivs[index], $cancelDropzoneDiv, position)) {
				return;
			} else if (isWithin($ownHandDivs[index], $playCardDropzoneDiv, position)) {
				if (!$ownPlayedCardDiv) return;

				if (await playedCardCallback(index)) {
					let newPosition = (await gotoElement($ownHandDivs[index], $ownPlayedCardDiv, 150, {
						beforeAnimation: () => {
							$ownPlayedCard = null;
						},
						afterAnimation: async () => {
							$ownPlayedCard = $ownHand[index];
							$ownHand.splice(index, 1);
							$ownHand = [...$ownHand];
							await wait(100);
							currentlyPlayingAnimation = false;
						},
						returnNewPosition: true
					})) || { x: 0, y: 0 };
					return {
						x: newPosition.x,
						y: newPosition.y,
						rotate: 0
					};
				}
			}
		} finally {
			currentlyPlayingAnimation = false;
		}
	}

	const colorSort = ['hearts', 'diamonds', 'clubs', 'spades'];
	$: if ($ownHand) {
		setTimeout(() => {
			$ownHandSorted = $ownHand.sort((a, b) => {
				const colorComparison =
					colorSort.indexOf(a.color || 'hearts') - colorSort.indexOf(b.color || 'hearts');
				if (colorComparison !== 0) {
					return colorComparison;
				}
				return (a.value || 0) - (b.value || 0);
			});
		}, 150);
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
		{#each $ownHandSorted as card, i (card.value + (card.color || 'U'))}
			<div
				class="duration-150"
				style="z-index: {i};"
				bind:this={$ownHandDivs[i]}
				animate:flip={{ duration: 250 }}
			>
				<Card index={i} {dragCallback} {card} draggable={true} width={$cardSizeX} />
			</div>
		{/each}
	</svelte:fragment>
</SchnopsnLayout>
