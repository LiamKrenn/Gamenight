import {
	GameServerWriteClient,
	MatchMaker,
	type GameServerClientBuilder,
	type Match,
	type SearchInfo
} from 'gn-matchmaker-client';

import SchnapsenClient, { SchnapsenClientBuilder } from 'gn-schnapsen-client';
import schnopsn, { cardToCardType } from './Schnopsn';
import { get } from 'svelte/store';

import type { CardType } from '$lib/types';
import { wait } from './SchnopsnAnimation';

const own_id = 'your_own_id'; // TODO: Replace with your actual own_id
const defaultSkin = 'default';

class SchnopsnConnection {
	instance: any; // Replace with the actual type of MatchMaker instance
	info: SearchInfo;
	inMatch: boolean;
	searching: boolean;

	constructor() {
		this.instance = new MatchMaker(
			'https://matchmaking.jjhost.at',
			own_id,
			// @ts-ignore
			new SchnapsenClientBuilder()
		);
		this.info = {
			game: 'Schnapsen',
			mode: {
				name: 'duo',
				player_count: 2,
				computer_lobby: false
			}
		};
		this.inMatch = false;
		this.searching = false;

		this.setupEventListeners();
	}

	setupEventListeners() {
		// @ts-ignore
		this.instance.on('_servers', (servers) => {
			console.log(servers);
		});

		this.instance.on('match', (client: SchnapsenClient) => {
			console.log('Match found');
			this.inMatch = true;
			this.searching = false;

			let onActive = async () => {
				console.log('Playing Card');
				let coolcards = cardToCardType(client.cardsAvailable);
				console.log('Available: ' + coolcards);
				schnopsn.ownHandUnsorted.set(coolcards);
				setTimeout(() => {
					console.log('Trump: ' + JSON.stringify(client.trump));
					console.log('Playable: ' + JSON.stringify(client.cardsPlayable));
					client.playCard(
						client.cardsPlayable[Math.floor(Math.random() * client.cardsPlayable.length)]
					);
				}, 1000);
			};

			client.on('self:allow_draw_card', async () => {
				console.log('Drawing card');
				setTimeout(() => {
					client.drawCard();
				}, 1000);
			});

			client.on('self:allow_play_card', onActive);

			client.on('play_card', (event) => {
				if (event.data.user_id === own_id) {
					schnopsn.ownHandUnsorted.set(
						get(schnopsn.ownHandUnsorted).filter(
							(card) => card !== cardToCardType([event.data.card])[0]
						)
					);
					schnopsn.ownPlayedCard.set(cardToCardType([event.data.card])[0]);
				} else {
					schnopsn.opponentPlayedCard.set(cardToCardType([event.data.card])[0]);
				}

				console.log(
					`Player ${event.data.user_id} played ${event.data.card.suit} ${event.data.card.value}`
				);
			});

			client.on('trick', (event) => {
				setTimeout(() => {
					schnopsn.ownPlayedCard.set(null);
					schnopsn.opponentPlayedCard.set(null);
				}, 1000);
			});

			client.on('self:trick', (trick) => {
				console.log('Trick: ' + trick);
			});

			client.on('self:card_available', (event) => {
				let coolcards = cardToCardType(client.cardsAvailable);
				console.log('Available: ' + coolcards);
				schnopsn.ownHandUnsorted.set(coolcards);
			});

			client.on('self:card_unavailable', (event) => {
				let coolcards = cardToCardType(client.cardsAvailable);
				console.log('Available: ' + coolcards);
				schnopsn.ownHandUnsorted.set(coolcards);
			});

			client.on('final_result', (event) => {
				console.log(event);
			});

			client.on('round_result', (result) => {
				client.disconnect();
				console.log('Round Result');
				console.log(result);
			});
		});
	}

	findMatch() {
		this.searching = true;
		this.instance.search(this.info);
	}
}

export const schnopsnConnection = new SchnopsnConnection();
