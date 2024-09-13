<script lang="ts">
	import type { CardType } from '$lib/types';
	import { cn } from '$lib/utils';
	import { draggable } from '@neodrag/svelte';
	import { tweened } from 'svelte/motion';
	import { getBB, wait, isWithin, gotoElement } from './schnopsn/SchnopsnAnimation';
	import {
		playCardDropzoneDiv,
		cancelDropzoneDiv,
		stackDropzoneDiv,
		currentlyDragging,
		ownHandDivs,
		ownHand,
		cardSizeX,
		cardSizeY
	} from './schnopsn/Schnopsn';
	import { onMount } from 'svelte';
	import mapTouchToMouseFor from './touchToMouse';

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
	export let rotation = tweened(rotate, { duration: 150 });

	let parent2 = '';
	export const reset = async (rotate2: number) => {
		parent2 = '!duration-0 !invisible';
		rotation.set(rotate2, { duration: 0 });
		parent2 = '!duration-0';
		position = { x: 0, y: 0 };
		await wait(10);
		parent2 = '';
		rotation.set(rotate);
	};

	$: if (card) {
		frontCardValue = hidden ? 'Back' : (card.color || 'U').slice(0, 1).toUpperCase() + card.value;
	}

	$: if (rotate || !rotate) {
		rotation.set(rotate);
	}

	let backCard = '';
	let frontCard = '';
	let drag = false;
	$: parent = drag
		? 'duration-0 cursor-grab !z-20'
		: 'duration-150 ' + (isDraggable ? 'cursor-pointer' : 'cursor-default');

	async function flipClose() {
		frontCard = 'flipClose';
		await wait(100);
		backCard = 'flipOpen';
		frontCardValue = hidden ? 'Back' : (card.color || 'U').slice(0, 1).toUpperCase() + card.value;
		await wait(100);
	}

	async function flipOpen() {
		backCard = 'flipClose';
		await wait(100);
		frontCard = 'flipOpen';
		frontCardValue = hidden ? 'Back' : (card.color || 'U').slice(0, 1).toUpperCase() + card.value;
		await wait(100);
	}

	$: if (hidden) {
		flipClose();
	} else {
		flipOpen();
	}

	let scale = tweened(1, { duration: 150 });

	onMount(() => {
		mapTouchToMouseFor('.touch');
	});

	$: disabled = !isDraggable || $currentlyDragging != null;

	let combiData = {
		deltaX: 0,
		deltaY: 0,
		value: 0,
		index: -1
	};

	function getCombiTranslate(offsetX: number, offsetY: number) {
		const x = combiData.deltaX + offsetX + $cardSizeX / (combiData.value == 4 ? 2 : -2);
		const y = combiData.deltaY + offsetY + $cardSizeY / 4;
		return `translate(${x}px, ${y}px)`;
	}

	async function setupForCombi() {
		if (card.value == 4 || card.value == 3) {
			const combiValue = card.value == 4 ? 3 : 4;
			const combiIndex = $ownHand.findIndex((c) => card.color == c.color && combiValue == c.value);
			if (combiIndex != -1) {
				let bb = getBB($ownHandDivs[combiIndex]);
				let own_bb = getBB($ownHandDivs[index]);
				const x = own_bb.left - bb.left;
				const y = own_bb.top - bb.top;
				$ownHandDivs[combiIndex].classList.remove('duration-150');
				$ownHandDivs[combiIndex].classList.add('duration-50');
				$ownHandDivs[combiIndex].style.transform =
					`translate(${x + $cardSizeX / (combiValue == 4 ? 2 : -2)}px, ${y + $cardSizeY / 4}px)`;

				await wait(50);
				$ownHandDivs[combiIndex].classList.remove('duration-50');
				$ownHandDivs[combiIndex].classList.add('duration-0');
				combiData = {
					deltaX: x,
					deltaY: y,
					value: combiValue,
					index: combiIndex
				};
			}
		}
	}

	function resetCombi() {
		if (combiData.index == -1) return;
		$ownHandDivs[combiData.index].classList.remove('duration-0');
		$ownHandDivs[combiData.index].classList.add('duration-150');
		$ownHandDivs[combiData.index].style.transform = '';
		combiData = {
			deltaX: 0,
			deltaY: 0,
			value: 0,
			index: -1
		};
	}
</script>

<div
	bind:this={cardDiv}
	class={cn('touch relative h-fit rounded-2xl', parent, parent2, parentClass)}
	style="width: {width}px; {styleString}"
	use:draggable={{
		position,
		disabled,
		onDrag: ({ offsetX, offsetY }) => {
			position = { x: offsetX, y: offsetY };
			if (combiData.index != -1) {
				$ownHandDivs[combiData.index].style.transform = getCombiTranslate(offsetX, offsetY);
			}

			if (cardDiv) {
				const withinPlayDropzone = isWithin(cardDiv, $playCardDropzoneDiv || new HTMLDivElement());
				const withinCancelDropzone = isWithin(cardDiv, $cancelDropzoneDiv || new HTMLDivElement());
				const withinStackDropzone = isWithin(cardDiv, $stackDropzoneDiv || new HTMLDivElement());

				if (withinStackDropzone) {
					rotation.set(20);
				} else {
					rotation.set(0);
					if (withinPlayDropzone && !withinCancelDropzone) {
						scale.set(1.2);
					} else {
						scale.set(1);
					}
				}
			}
		},
		onDragStart: async () => {
			drag = true;
			$currentlyDragging = index;
			setupForCombi();
		},
		onDragEnd: async () => {
			drag = false;
			scale.set(1);
			let result = (await dragCallback(index, position)) || { x: 0, y: 0, rotate: 0 };
			position = { x: result.x, y: result.y };
			rotation.set(result.rotate);
			$currentlyDragging = null;
			resetCombi();
		}
	}}
>
	<img
		class={cn(backCard, className, 'absolute h-full w-full object-contain !duration-0')}
		style="transform: rotate({$rotation}deg); scale: {$scale}"
		src="/card_skins/{card.skin}/Back.svg"
		alt="Hidden Card"
		inert
	/>
	<img
		class={cn(
			' h-full w-full object-contain !duration-0',
			frontCard,
			className,
			shadow ? 'cshadow rounded-[7%]' : ''
		)}
		style="transform: rotate({$rotation}deg); scale: {$scale}"
		src="/card_skins/{card.skin}/{frontCardValue}.svg"
		alt="{card.color} {card.value}"
		inert
	/>
</div>

<style>
	.touch {
		-webkit-touch-callout: none;
		-ms-touch-action: none;
		touch-action: none;
	}
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
