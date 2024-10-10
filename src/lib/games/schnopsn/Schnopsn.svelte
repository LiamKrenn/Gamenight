<script lang="ts">
	import SchnopsnAnimationHandler from './SchnopsnAnimationHandler.svelte';

	function buttonClicked() {
		console.log('Button clicked');
	}

	function playedCardCallback(index: number): Promise<boolean> {
		return Promise.resolve(true);
	}

	function swapCardCallback(index: number): Promise<boolean> {
		return Promise.resolve(true);
	}

	import {
		GameServerWriteClient,
		MatchMaker,
		type GameServerClientBuilder,
		type Match,
		type SearchInfo
	} from 'gn-matchmaker-client';

	import SchnapsenClient, { SchnapsenClientBuilder } from 'gn-schnapsen-client';
	import { wait } from './SchnopsnAnimation';
	import { browser } from '$app/environment';
	import {
		cardToCardType,
		opponentHand,
		opponentPlayedCard,
		ownHand,
		ownPlayedCard
	} from './Schnopsn';

	if (browser) {
		const own_id = 'saus' + Math.random();

		let instance = new MatchMaker(
			'https://matchmaking.jjhost.at',
			own_id,
			new SchnapsenClientBuilder()
		);
		let info: SearchInfo = {
			game: 'Schnapsen',
			mode: {
				name: 'duo',
				player_count: 2,
				computer_lobby: false
			}
		};
		instance.search(info);

		instance.on('_servers', (servers) => {
			console.log(servers);
		});

		instance.on('match', (client: SchnapsenClient) => {
			console.log('Match found');

			let onActive = async () => {
				console.log('Playing Card');
				let coolcards = cardToCardType(client.cardsAvailable);
				console.log('Available: ' + coolcards);
				$ownHand = coolcards;
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
					$ownHand = $ownHand.filter((card) => card !== cardToCardType([event.data.card])[0]);
					$ownPlayedCard = cardToCardType([event.data.card])[0];
				} else {
					$opponentPlayedCard = cardToCardType([event.data.card])[0];
				}

				console.log(
					`Player ${event.data.user_id} played ${event.data.card.suit} ${event.data.card.value}`
				);
			});

			client.on('trick', (event) => {
				setTimeout(() => {
					$ownPlayedCard = null;
					$opponentPlayedCard = null;
				}, 1000);
			});

			client.on('self:trick', (trick) => {
				console.log('Trick: ' + trick);
			});

			client.on('self:card_available', (event) => {
				// console.log(event);
				let coolcards = cardToCardType(client.cardsAvailable);
				console.log('Available: ' + coolcards);
				$ownHand = coolcards;
			});

			client.on('self:card_unavailable', (event) => {
				let coolcards = cardToCardType(client.cardsAvailable);
				console.log('Available: ' + coolcards);
				$ownHand = coolcards;
				// console.log(event);
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
</script>

<!-- <button on:click={buttonClicked} class="bg-slate-600 p-2">Test</button> -->
<SchnopsnAnimationHandler {playedCardCallback} {swapCardCallback} />
