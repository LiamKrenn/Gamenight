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
		playCardDropzoneDiv
	} from './Schnopsn';
	import SchnopsnLayout from './SchnopsnLayout.svelte';
	import { goto, within } from './SchnopsnAnimation';

	let currentlyPlayingAnimation = false;
	async function dragCallback(
		index: number,
		position: { x: number; y: number }
	): Promise<{ x: number; y: number; rotate: number } | void> {
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

		if (withinStack) {
		} else if (withinCancel) {
		} else if (withinPlayCard) {
			let newPosition = (await goto($ownHandDivs[index], $ownPlayedCardDiv, 150, {
				beforeAnimation: () => {
					$ownPlayedCard = null;
				},
				afterAnimation: () => {
					$ownPlayedCard = $ownHand[index];
					$ownHand.splice(index, 1);
					$ownHand = [...$ownHand];
					setTimeout(() => {
						currentlyPlayingAnimation = false;
					}, 100);
				},
				returnNewPosition: true
			})) || { x: 0, y: 0 };
			return {
				x: newPosition.x,
				y: newPosition.y,
				rotate: 0
			};
		}

		currentlyPlayingAnimation = false;
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
		<div class="absolute left-[54%] mt-3">
			<Card card={$stackCard} draggable={false} width={$cardSizeX} rotate={90} />
		</div>
		<Card
			parentClass="absolute top-4"
			card={$stackEmptyCard}
			draggable={false}
			width={$cardSizeX}
		/>
		<Card
			shadow={false}
			parentClass="absolute top-2"
			card={$stackEmptyCard}
			draggable={false}
			width={$cardSizeX}
		/>
		<Card shadow={false} card={$stackEmptyCard} draggable={false} width={$cardSizeX} />
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
