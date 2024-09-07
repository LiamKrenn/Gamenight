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
		ownTricks,
		opponentTricks,
		ownEmptyCard
	} from './Schnopsn';
	import { ZoomIn } from 'lucide-svelte';

	let handWidth = 0;
	let screenHeight = 0;

	$: if (handWidth) {
		$cardSizeX = handWidth / 4;
		$cardSizeY = $cardSizeX * 1.39;
	}

	const isMobile = mediaQuery('(min-width: 850px)');
	$: isHighScreen = screenHeight > 600;
</script>

<svelte:window bind:innerHeight={screenHeight} />
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
			class="flex w-[80vmin] max-w-[80%] -space-x-[6%] mobile:w-[60vmin] mobile:max-w-[57%]"
			style="margin-top: -{$cardSizeY / 2.4}px; height: {$cardSizeY}px;"
		>
			<slot name="opponentHand" />
		</div>

		<!-- Played Cards -->
		<div class="relative flex w-full items-center justify-center">
			<div
				class="relative flex"
				style="height: {$cardSizeY *
					(isHighScreen && !$isMobile ? 1.5 : 1)}px; width: {isHighScreen && !$isMobile
					? `${$cardSizeX * 1.5}px`
					: 'auto'};"
			>
				<div
					bind:this={$opponentPlayedCardDiv}
					class=" {!isHighScreen && !$isMobile
						? 'static'
						: 'absolute'} left-0 top-0 flex items-center justify-center rounded-sm bg-slate-700/20 mobile:static"
					style="height: {$cardSizeY}px; width: {$cardSizeX}px; margin-right: {$cardSizeX / 4}px;"
				>
					<slot name="opponentPlayedCard" />
				</div>
				<div
					bind:this={$ownPlayedCardDiv}
					class=" bottom-0 right-0 {!isHighScreen && !$isMobile
						? 'static'
						: 'absolute'} flex items-center justify-center rounded-sm bg-slate-700/20 mobile:static"
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
		{#if $ownTricks[0] && $ownTricks[1]}
			<div
				class="absolute right-[10vmin] flex opacity-75 duration-0 mobile:right-16 lg:right-24 2xl:right-40"
				style="bottom: {$isMobile
					? `calc(5vmin - ${($cardSizeY - $cardSizeX) / 4}px)`
					: ` calc(13vmin + ${$cardSizeY}px)`};"
			>
				<div class="rotate-90">
					<Card card={$ownTricks[0]} width={$cardSizeX / 2} />
				</div>
				<div
					class="absolute rotate-[-20deg]"
					style="right: -{$cardSizeX / 8}px; top: -{$cardSizeX / 4}px;"
				>
					<Card card={$ownTricks[1]} width={$cardSizeX / 2} />
				</div>
				<div class="absolute" style="right: -{$cardSizeX / 4}px; top: -{$cardSizeX / 10}px;">
					<Card card={$ownEmptyCard} width={$cardSizeX / 2} />
				</div>
				<ZoomIn
					class="absolute opacity-80"
					style="right: -{$cardSizeX / 4.5}px; top: -{$cardSizeX / 3.5}px; height: {$cardSizeX /
						6}px; width: {$cardSizeX / 6}px;"
				/>
				<button
					class="absolute z-50 rounded-lg hover:bg-slate-700/20"
					style="left: -{$cardSizeX / 5.8}px; top: -{$cardSizeX /
						3}px; height: {$cardSizeX}px; width: {$cardSizeX / 1}px;"
				></button>
			</div>
		{/if}

		<!-- Opponent Tricks -->
		{#if $opponentTricks[0] && $opponentTricks[1]}
			<div
				class="absolute right-[10vmin] flex opacity-75 duration-0 mobile:right-16 lg:right-24 2xl:right-40"
				style="top: {$isMobile
					? `calc(3vmin - ${($cardSizeY - $cardSizeX) / 4}px)`
					: ` calc(-9vmin + ${$cardSizeY}px)`};"
			>
				<div class="rotate-90">
					<Card card={$opponentTricks[0]} width={$cardSizeX / 2} />
				</div>
				<div
					class="absolute rotate-[20deg]"
					style="right: -{$cardSizeX / 8}px; bottom: -{$cardSizeX / 4}px;"
				>
					<Card card={$opponentTricks[1]} width={$cardSizeX / 2} />
				</div>
				<div class="absolute" style="right: -{$cardSizeX / 4}px; bottom: -{$cardSizeX / 10}px;">
					<Card card={$ownEmptyCard} width={$cardSizeX / 2} />
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
