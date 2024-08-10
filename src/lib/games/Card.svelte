<script lang="ts">
	import type { CardType } from '$lib/types';
	import { cn } from '$lib/utils';
	import { draggable } from '@neodrag/svelte';

	export let card: CardType;
  let isDraggable = false;
  export { isDraggable as draggable };
	let className: string = '';
	export let width: number = 200;
	export { className as class };
	export let position = { x: 0, y: 0 };

	let hidden = card.value == undefined || card.color == undefined;

	let frontCardValue = hidden ? 'Back' : (card.color || 'U').slice(0, 1).toUpperCase() + card.value;

	let backCard = '';
	let frontCard = '';
	let drag = false;
	$: parent = drag ? '!duration-0 cursor-grab z-10' : '!duration-150 ' + (isDraggable ? 'cursor-pointer' : 'cursor-default');

	$: if (hidden) {
		frontCard = 'flipClose';
		setTimeout(() => {
			backCard = 'flipOpen';
			frontCardValue = hidden ? 'Back' : (card.color || 'U').slice(0, 1).toUpperCase() + card.value;
			setTimeout(() => {}, 100);
		}, 100);
	} else {
		backCard = 'flipClose';
		setTimeout(() => {
			frontCard = 'flipOpen';
			frontCardValue = hidden ? 'Back' : (card.color || 'U').slice(0, 1).toUpperCase() + card.value;
			setTimeout(() => {}, 100);
		}, 100);
	}
</script>

<div
	class={cn('cshadow relative h-fit w-fit rounded-2xl', parent, `w-[${width}px]`)}
	use:draggable={{
		position,
    disabled: !isDraggable,
		onDrag: ({ offsetX, offsetY }) => {
			position = { x: offsetX, y: offsetY };
		},
		onDragStart: () => {
			drag = true;
		},
		onDragEnd: () => {
			drag = false;
			position = { x: 0, y: 0 };
		}
	}}
>
	<img
		class={cn('absolute', frontCard, className)}
		src="/card_skins/{card.skin}/{frontCardValue}.svg"
		alt="{card.color} {card.value}"
		inert
	/>
	<img
		class={cn(backCard, className)}
		src="/card_skins/{card.skin}/Back.svg"
		alt="Hidden Card"
		inert
	/>
</div>

<style>
	:global(.flipClose) {
		transition-duration: 100ms;
		transition-timing-function: ease-in;
		transform: scaleX(0);
	}

	:global(.flipOpen) {
		transition-duration: 100ms;
		transition-timing-function: ease-out;
		transform: scaleX(1);
	}
</style>
