import { derived, writable, type Stores, type Writable } from 'svelte/store';
import schnopsn from './Schnopsn';
import { type CardType } from '$lib/types';

export const cardSizeX = writable(0);
export const cardSizeY = writable(0);

// const colorSort = ['hearts', 'diamonds', 'clubs', 'spades'];
// export const ownHand = derived<Writable<CardType[]>, CardType[]>(
// 	schnopsn.ownHandUnsorted,
// 	 ($ownHandUnsorted) => {
// 		return $ownHandUnsorted.sort((a, b) => {
// 			const colorComparison =
// 				colorSort.indexOf(a.color || 'hearts') - colorSort.indexOf(b.color || 'hearts');
// 			if (colorComparison !== 0) {
// 				return colorComparison;
// 			}
// 			return (a.value || 0) - (b.value || 0);
// 		});
// 	}
// );

export const stackCardDiv = writable<HTMLDivElement | null>(null);
export const stackCardWrapperDiv = writable<HTMLDivElement | null>(null);
export const ownHandDivs = writable<HTMLDivElement[]>([]);
export const opponentHandDivs = writable<HTMLDivElement[]>([]);

export const ownPlayedCardDiv = writable<HTMLDivElement | null>(null);
export const opponentPlayedCardDiv = writable<HTMLDivElement | null>(null);

export const cancelDropzoneDiv = writable<HTMLDivElement | null>(null);
export const playCardDropzoneDiv = writable<HTMLDivElement | null>(null);
export const stackDropzoneDiv = writable<HTMLDivElement | null>(null);

export const blockUI = writable(false);
