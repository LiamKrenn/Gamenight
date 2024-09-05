import { get } from 'svelte/store';
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
	ownPlayedCardDiv
} from './Schnopsn';

function getBB(element: HTMLElement): DOMRect {
	return element.getBoundingClientRect();
}

export function within(
	source: HTMLElement,
	target: HTMLElement,
	offset: null | { x: number; y: number }
): boolean {
	const sourceBB = getBB(source);
	const targetBB = getBB(target);
	let sourceCenter = { x: sourceBB.x + sourceBB.width / 2, y: sourceBB.y + sourceBB.height / 2 };
	if (offset) {
		sourceCenter = { x: sourceCenter.x + offset.x, y: sourceCenter.y + offset.y };
	}
	const withinX = sourceCenter.x >= targetBB.x && sourceCenter.x <= targetBB.x + targetBB.width;
	const withinY = sourceCenter.y >= targetBB.y && sourceCenter.y <= targetBB.y + targetBB.height;
	return withinX && withinY;
}

export async function goto(
	source: HTMLElement,
	target: HTMLElement,
	duration: number = 150,
	config: { beforeAnimation: () => void; afterAnimation: () => void; returnNewPosition: boolean }
): Promise<void | { x: number; y: number }> {
	try {
		const targetBB = getBB(target);
		const curCoords = source.getBoundingClientRect();
		config.beforeAnimation();
		if (config.returnNewPosition) {
			return { x: targetBB.x - curCoords.x, y: targetBB.y - curCoords.y };
		} else {
			target.style.transform = `translate(${targetBB.x - curCoords.x}px, ${targetBB.y - curCoords.y}px)`;
		}
	} finally {
		setTimeout(() => {
			config.afterAnimation();
		}, duration + 10);
	}
}
