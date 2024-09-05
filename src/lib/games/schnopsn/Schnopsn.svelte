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
		stackCardWrapperDiv
	} from './Schnopsn';
	import SchnopsnLayout from './SchnopsnLayout.svelte';
	import { getBB, goto, gotoCoords, wait, within } from './SchnopsnAnimation';
	import { tweened } from 'svelte/motion';

	let stackCardPos = { x: 0, y: 0 };
	let stackClasses = '';
	let stackCardRotation = 90;
	let resetStack: (rotate: number) => void = () => {};

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

			const withinStack = within($ownHandDivs[index], $stackDropzoneDiv, position);
			const withinCancel = within($ownHandDivs[index], $cancelDropzoneDiv, position);
			const withinPlayCard = within($ownHandDivs[index], $playCardDropzoneDiv, position);

			console.log('withinStack', withinStack);
			console.log('withinCancel', withinCancel);
			console.log('withinPlayCard', withinPlayCard);

			if (withinStack && $stackCardDiv && $stackCardWrapperDiv) {
				const stackBB = getBB($stackCardDiv);
				const cardBB = getBB($ownHandDivs[index]);

				stackCardRotation = 0;
				$stackCardDiv.style.zIndex = '20';
				stackCardPos = { x: cardBB.x - stackBB.x, y: cardBB.y - stackBB.y };

				let newPosition = (await goto($ownHandDivs[index], $stackCardWrapperDiv, 150, {
					beforeAnimation: () => {},
					afterAnimation: async () => {
						if (!$stackCardDiv) return;
						const playedCard = $ownHand[index];
						$ownHand[index] = $stackCard;
						stackCardRotation = 0;
						$stackCard = playedCard;
						resetStack(90);
						stackCardRotation = 90;
					},
					returnNewPosition: true
				})) || { x: 0, y: 0 };

				return {
					x: newPosition.x,
					y: newPosition.y,
					rotate: 90
				};
			} else if (withinCancel) {
				return;
			} else if (withinPlayCard) {
				let newPosition = (await goto($ownHandDivs[index], $ownPlayedCardDiv, 150, {
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
		} finally {
			currentlyPlayingAnimation = false;
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
			class="absolute z-20 mt-3"
		>
			<div bind:this={$stackCardDiv}>
				<Card
					bind:reset={resetStack}
					card={$stackCard}
					draggable={false}
					position={stackCardPos}
					width={$cardSizeX}
					rotate={stackCardRotation}
					class={stackClasses}
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
		{#each $ownHand as card, i (card.value + (card.color || 'U'))}
			<div bind:this={$ownHandDivs[i]} animate:flip={{ duration: 250 }}>
				<Card index={i} {dragCallback} {card} draggable={true} width={$cardSizeX} />
			</div>
		{/each}
	</svelte:fragment>
</SchnopsnLayout>
