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

interface Card {
	value: CardVal;
	suit: CardSuit;
}

enum CardVal {
	Ten = 'Ten',
	Jack = 'Jack',
	Queen = 'Queen',
	King = 'King',
	Ace = 'Ace'
}

enum CardSuit {
	Hearts = 'Hearts',
	Diamonds = 'Diamonds',
	Clubs = 'Clubs',
	Spades = 'Spades'
}

export function cardToCardType(card: Card[]): CardType[] {
	return card.map((c) => {
		let newValue: 2 | 3 | 4 | 10 | 11 | undefined = undefined;

		switch (c.value) {
			case CardVal.Ten:
				newValue = 10;
				break;
			case CardVal.Jack:
				newValue = 2;
				break;
			case CardVal.Queen:
				newValue = 3;
				break;
			case CardVal.King:
				newValue = 4;
				break;
			case CardVal.Ace:
				newValue = 11;
				break;
			default:
				newValue = undefined;
				break;
		}

		return {
			skin: 'default',
			color: c.suit.toLowerCase() as 'hearts' | 'diamonds' | 'clubs' | 'spades',
			value: newValue
		};
	});
}
