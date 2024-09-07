<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import Card from '../Card.svelte';
	import {
		cardSizeX,
		cardSizeY,
		ownPlayedCardDiv,
		opponentPlayedCardDiv,
		stackDropzoneDiv,
		cancelDropzoneDiv,
		playCardDropzoneDiv,
		ownTrick1,
		ownTrick2
	} from './Schnopsn';

	let handWidth = 0;

	$: if (handWidth) {
		$cardSizeX = handWidth / 4;
		$cardSizeY = $cardSizeX * 1.39;
	}

	const isMobile = mediaQuery('(min-width: 850px)');
</script>

<div class="relative flex h-full w-full items-center justify-center overflow-hidden p-0">
	<div class="flex h-full w-full flex-col items-center justify-between">
		<!-- Card Drop Zones -->
		<div class="absolute left-0 top-0 flex h-full w-full items-center">
			<div bind:this={$playCardDropzoneDiv} class="absolute bottom-0 h-full w-full"></div>
			<div
				bind:this={$stackDropzoneDiv}
				class="absolute h-[50%] w-[30%]"
				style="max-width: {1.5 * $cardSizeY}px; margin-top: -{$cardSizeY /
					2.4}px; max-height: {2.5 * $cardSizeY}px;"
			></div>
			<div
				bind:this={$cancelDropzoneDiv}
				class="absolute bottom-0 h-[30%] w-full"
				style="min-height: {$cardSizeY * 1.1}px; max-height: {$cardSizeY * 1.5}px;"
			></div>
		</div>

		<!-- Opponent Hand -->
		<div
			class="mobile:w-[60vmin] mobile:max-w-[57%] h-[{$cardSizeY}px] flex w-[80%] max-w-[80%] -space-x-[6%]"
			style="margin-top: -{$cardSizeY / 2.4}px"
		>
			<slot name="opponentHand" />
		</div>

		<!-- Played Cards -->
		<div class="relative flex w-full items-center justify-center space-x-6">
			<div
				class="relative flex space-x-6"
				style="height: {$cardSizeY * (!$isMobile ? 1.5 : 1)}px; width: {!$isMobile
					? `${$cardSizeX * 1.5}px`
					: 'auto'};"
			>
				<div
					bind:this={$opponentPlayedCardDiv}
					class="absolute left-0 top-0 flex items-center justify-center rounded-sm bg-slate-700/20 mobile:static"
					style="height: {$cardSizeY}px; width: {$cardSizeX}px"
				>
					<slot name="opponentPlayedCard" />
				</div>
				<div
					bind:this={$ownPlayedCardDiv}
					class="absolute bottom-0 right-0 flex items-center justify-center rounded-sm bg-slate-700/20 mobile:static"
					style="height: {$cardSizeY}px; width: {$cardSizeX}px"
				>
					<slot name="ownPlayedCard" />
				</div>
			</div>

			<!-- Stack -->
			<div
				class="absolute mobile:left-[4%]"
				style="left: {$isMobile ? $cardSizeX / -2 : $cardSizeX / -1.35}px; "
			>
				<slot name="stack" />
			</div>
		</div>

		<!-- Own Hand -->
		<div
			bind:clientWidth={handWidth}
			class="mb-[10vmin] flex w-[80vmin] max-w-[80%] justify-center -space-x-[6%] mobile:mb-[5vmin] mobile:w-[60vmin] mobile:max-w-[57%]"
			style="height: {$cardSizeY}px"
		>
			<slot name="ownHand" />
		</div>

		<!-- Own Trick -->
		{#if $ownTrick1 && $ownTrick2}
			<div
				class="absolute left-[8vmin] flex opacity-75 duration-0 mobile:left-16 2xl:left-32"
				style="bottom: {$isMobile
					? `calc(5vmin - ${($cardSizeY - $cardSizeX) / 4}px)`
					: ` calc(14vmin + ${$cardSizeY}px)`};"
			>
				<div class="rotate-90">
					<Card card={$ownTrick1} width={$cardSizeX / 2} />
				</div>
				<div
					class="absolute rotate-[9deg]"
					style="left: -{$cardSizeX / 6}px; top: -{$cardSizeX / 8}px;"
				>
					<Card card={$ownTrick2} width={$cardSizeX / 2} />
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
