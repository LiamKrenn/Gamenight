import { get } from 'svelte/store';
import * as stores from './Schnopsn';
import { browser } from '$app/environment';

export const wait = async (t: number) => {
	if (!browser) return;
	await new Promise((resolve) => setTimeout(resolve, t));
	return new Promise((resolve) => requestAnimationFrame(resolve));
};

export function getBB(element: HTMLElement): DOMRect {
	return element.getBoundingClientRect();
}

export function isWithin(
	source: HTMLElement,
	target: HTMLElement,
	offset: null | { x: number; y: number } = null
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

export async function gotoElement(
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

export async function gotoCoords(
	source: HTMLElement,
	target: { x: number; y: number },
	duration: number = 150,
	config: { beforeAnimation: () => void; afterAnimation: () => void; returnNewPosition: boolean }
): Promise<void | { x: number; y: number }> {
	try {
		const curCoords = source.getBoundingClientRect();
		config.beforeAnimation();
		if (config.returnNewPosition) {
			return { x: target.x - curCoords.x, y: target.y - curCoords.y };
		} else {
			source.style.transform = `translate(${target.x - curCoords.x}px, ${target.y - curCoords.y}px)`;
		}
	} finally {
		setTimeout(() => {
			config.afterAnimation();
		}, duration + 10);
	}
}
