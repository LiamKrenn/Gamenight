import type { CardType } from '$lib/types';
import { derived, get, writable } from 'svelte/store';
import { wait } from './SchnopsnAnimation';

const defaultSkin = 'default';

export const ownSkin = writable('default');
export const opponentSkin = writable('default');

export const ownHand = writable<CardType[]>([
	{
		color: 'hearts',
		value: 11,
		skin: get(ownSkin)
	},
	{
		color: 'hearts',
		value: 4,
		skin: get(ownSkin)
	},
	{
		color: 'clubs',
		value: 3,
		skin: get(ownSkin)
	},
	{
		color: 'clubs',
		value: 4,
		skin: get(ownSkin)
	},
	{
		color: 'spades',
		value: 11,
		skin: get(ownSkin)
	}
]);

export const ownHandSorted = writable<CardType[]>(get(ownHand));

export const opponentHand = writable<CardType[]>([
	{
		skin: get(opponentSkin),
		color: undefined,
		value: undefined
	},
	{
		skin: get(opponentSkin),
		color: undefined,
		value: undefined
	},
	{
		skin: get(opponentSkin),
		color: undefined,
		value: undefined
	},
	{
		skin: get(opponentSkin),
		color: undefined,
		value: undefined
	},
	{
		skin: get(opponentSkin),
		color: undefined,
		value: undefined
	}
]);

export const ownEmptyCard = writable<CardType>({
	skin: get(ownSkin),
	color: undefined,
	value: undefined
});

export const opponentEmptyCard = writable<CardType>({
	skin: get(opponentSkin),
	color: undefined,
	value: undefined
});

export const stackEmptyCard = writable<CardType>({
	skin: 'default',
	color: undefined,
	value: undefined
});

export const stackCard = writable<CardType>({
	skin: defaultSkin,
	color: 'spades',
	value: 2
});

export const stackClosed = writable(false);

export const ownPlayedCard = writable<CardType | null>(null);
export const opponentPlayedCard = writable<CardType | null>(null);

export const ownTricks = writable<CardType[]>([
	{
		skin: defaultSkin,
		color: 'hearts',
		value: 3
	},
	{
		skin: defaultSkin,
		color: 'hearts',
		value: 2
	},
	{
		skin: defaultSkin,
		color: 'spades',
		value: 2
	},
	{
		skin: defaultSkin,
		color: 'clubs',
		value: 11
	}
]);

export const opponentTricks = writable<CardType[]>([
	{
		skin: defaultSkin,
		color: 'spades',
		value: 2
	},
	{
		skin: defaultSkin,
		color: 'clubs',
		value: 11
	},
	get(opponentEmptyCard),
	get(opponentEmptyCard)
]);

export const cardSizeX = writable(0);
export const cardSizeY = writable(0);

export const stackCardDiv = writable<HTMLDivElement | null>(null);
export const stackCardWrapperDiv = writable<HTMLDivElement | null>(null);
export const ownHandDivs = writable<HTMLDivElement[]>([]);
export const opponentHandDivs = writable<HTMLDivElement[]>([]);

export const ownPlayedCardDiv = writable<HTMLDivElement | null>(null);
export const opponentPlayedCardDiv = writable<HTMLDivElement | null>(null);

export const cancelDropzoneDiv = writable<HTMLDivElement | null>(null);
export const playCardDropzoneDiv = writable<HTMLDivElement | null>(null);
export const stackDropzoneDiv = writable<HTMLDivElement | null>(null);

export const currentlyDragging = writable<number | null>(null);
