<script lang="ts">
	import {
		cardSizeX,
		cardSizeY,
		ownPlayedCardDiv,
		opponentPlayedCardDiv,
		stackDropzoneDiv,
		cancelDropzoneDiv,
		playCardDropzoneDiv
	} from './Schnopsn';

	let handWidth = 0;

	$: if (handWidth) {
		$cardSizeX = handWidth / 4;
		$cardSizeY = $cardSizeX * 1.39;
	}
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
			class="w-[60vmin] h-[{$cardSizeY}px] flex max-w-[57%] -space-x-[6%]"
			style="margin-top: -{$cardSizeY / 2.4}px"
		>
			<slot name="opponentHand" />
		</div>

		<!-- Played Cards -->
		<div class="relative flex w-full justify-center space-x-6">
			<div
				bind:this={$opponentPlayedCardDiv}
				class="flex items-center justify-center rounded-sm bg-slate-700/20"
				style="height: {$cardSizeY}px; width: {$cardSizeX}px"
			>
				<slot name="opponentPlayedCard" />
			</div>
			<div
				bind:this={$ownPlayedCardDiv}
				class="flex items-center justify-center rounded-sm bg-slate-700/20"
				style="height: {$cardSizeY}px; width: {$cardSizeX}px"
			>
				<slot name="ownPlayedCard" />
			</div>

			<!-- Stack -->
			<div class="absolute mobile:left-[4%]" style="left: -{$cardSizeX / 2}px; ">
				<slot name="stack" />
			</div>
		</div>

		<!-- Own Hand -->
		<div
			bind:clientWidth={handWidth}
			class="mb-[2%] flex w-[60vmin] max-w-[57%] justify-center -space-x-[6%]"
			style="height: {$cardSizeY}px"
		>
			<slot name="ownHand" />
		</div>
	</div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
