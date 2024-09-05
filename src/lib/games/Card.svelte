<script lang="ts">
	import type { CardType } from '$lib/types';
	import { cn } from '$lib/utils';
	import { draggable } from '@neodrag/svelte';
	import { tweened } from 'svelte/motion';
	import { getBB, within } from './schnopsn/SchnopsnAnimation';
	import { playCardDropzoneDiv, cancelDropzoneDiv, stackDropzoneDiv } from './schnopsn/Schnopsn';

	export let card: CardType;
	let isDraggable = false;
	export { isDraggable as draggable };
	let className: string = '';
	let styleString: string = '';
	export let parentClass: string = '';
	export let width: number = 200;
	export let shadow = true;
	export { styleString as style };
	export { className as class };
	export let position = { x: 0, y: 0 };

	export let cardDiv: HTMLDivElement | null = null;
	export let index: number = -1;
	export let dragCallback: (
		index: number,
		position: { x: number; y: number }
	) => Promise<{ x: number; y: number; rotate: number } | void> = async () => {};

	let hidden = card.value == undefined || card.color == undefined;

	let frontCardValue = hidden ? 'Back' : (card.color || 'U').slice(0, 1).toUpperCase() + card.value;

	export let rotate = 0;
	const rotation = tweened(rotate, { duration: 150 });

	let backCard = '';
	let frontCard = '';
	let drag = false;
	$: parent = drag
		? '!duration-0 cursor-grab z-10'
		: '!duration-150 ' + (isDraggable ? 'cursor-pointer' : 'cursor-default');

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

	let scale = tweened(1, { duration: 150 });
</script>

<div
	bind:this={cardDiv}
	class={cn('relative h-fit rounded-2xl', parent, parentClass)}
	style="width: {width}px;"
	use:draggable={{
		position,
		disabled: !isDraggable,
		onDrag: ({ offsetX, offsetY }) => {
			position = { x: offsetX, y: offsetY };
			if (cardDiv) {
				const withinPlayDropzone = within(cardDiv, $playCardDropzoneDiv || new HTMLDivElement());
				const withinCancelDropzone = within(cardDiv, $cancelDropzoneDiv || new HTMLDivElement());
				const withinStackDropzone = within(cardDiv, $stackDropzoneDiv || new HTMLDivElement());

				if (withinStackDropzone) {
					rotation.set(15);
				} else {
					rotation.set(0);
					if (withinPlayDropzone && !withinCancelDropzone) {
						console.log(withinPlayDropzone && !withinCancelDropzone);
						scale.set(1.2);
					} else {
						scale.set(1);
					}
				}
			}
		},
		onDragStart: () => {
			console.log(getBB($stackDropzoneDiv || new HTMLDivElement()));

			drag = true;
		},
		onDragEnd: async () => {
			drag = false;
			scale.set(1);
			let result = (await dragCallback(index, position)) || { x: 0, y: 0, rotate: 0 };
			position = { x: result.x, y: result.y };
			rotation.set(result.rotate);
		}
	}}
>
	<img
		class={cn(
			'absolute h-full w-full object-contain !duration-0',
			frontCard,
			className,
			shadow ? 'cshadow rounded-[7%]' : '',
			hidden ? '-z-10' : 'z-10'
		)}
		style="transform: rotate({$rotation}deg); scale: {$scale}"
		src="/card_skins/{card.skin}/{frontCardValue}.svg"
		alt="{card.color} {card.value}"
		inert
	/>
	<img
		class={cn(backCard, className, 'h-full w-full object-contain !duration-0')}
		style="transform: rotate({$rotation}deg); scale: {$scale}"
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
