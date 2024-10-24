import type { CardType } from '$lib/types';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { wait } from './SchnopsnAnimation';

const defaultSkin = 'default';

class Schnopsn {
	ownSkin: Writable<string>;
	opponentSkin: Writable<string>;
	ownHandUnsorted: Writable<CardType[]>;
	opponentHand: Writable<CardType[]>;
	ownEmptyCard: Writable<CardType>;
	opponentEmptyCard: Writable<CardType>;
	stackEmptyCard: Writable<CardType>;
	stackCard: Writable<CardType>;
	stackClosed: Writable<boolean>;
	ownPlayedCard: Writable<CardType | null>;
	opponentPlayedCard: Writable<CardType | null>;
	ownTricks: Writable<CardType[]>;
	opponentTricks: Writable<CardType[]>;

	constructor() {
		this.ownSkin = writable(defaultSkin); // TODO: customizable skins
		this.opponentSkin = writable(defaultSkin);

		this.ownHandUnsorted = writable<CardType[]>([
			{
				skin: defaultSkin,
				color: 'hearts',
				value: 11
			},
			{
				skin: defaultSkin,
				color: 'clubs',
				value: 3
			},
			{
				skin: defaultSkin,
				color: 'clubs',
				value: 4
			},
			{
				skin: defaultSkin,
				color: 'spades',
				value: 11
			},
			{
				skin: defaultSkin,
				color: 'hearts',
				value: 4
			}
		]);
		this.opponentHand = writable<CardType[]>([
			{
				skin: 'default',
				color: undefined,
				value: undefined
			},
			{
				skin: 'default',
				color: undefined,
				value: undefined
			},
			{
				skin: 'default',
				color: undefined,
				value: undefined
			},
			{
				skin: 'default',
				color: undefined,
				value: undefined
			},
			{
				skin: 'default',
				color: undefined,
				value: undefined
			}
		]);

		this.ownEmptyCard = writable({
			skin: get(this.ownSkin),
			color: undefined,
			value: undefined
		});
		this.opponentEmptyCard = writable({
			skin: get(this.opponentSkin),
			color: undefined,
			value: undefined
		});
		this.stackEmptyCard = writable({
			skin: defaultSkin,
			color: undefined,
			value: undefined
		});

		this.stackCard = writable({
			skin: defaultSkin,
			color: 'hearts',
			value: 2
		}); //get(this.stackEmptyCard)
		this.stackClosed = writable(false);

		this.ownPlayedCard = writable(null);
		this.opponentPlayedCard = writable(null);

		this.ownTricks = writable([]);
		this.opponentTricks = writable([]);
	}
}

const schnopsn = new Schnopsn();

export default schnopsn;

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
