<script lang="ts">
	import type { CardType } from '$lib/types';
	import Card from '../Card.svelte';

	let mockupOwnHand: CardType[] = [
		{
			color: 'hearts',
			value: 11,
			skin: 'default'
		},
		{
			color: 'hearts',
			value: 4,
			skin: 'default'
		},
		{
			color: 'clubs',
			value: 3,
			skin: 'default'
		},
		{
			color: 'clubs',
			value: 4,
			skin: 'default'
		},
		{
			color: 'spades',
			value: 11,
			skin: 'default'
		}
	];

	let mockupOpponentHand: CardType[] = [
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
	];
</script>

<div class="h-full w-full overflow-hidden p-4 relative flex justify-center">
  <div class="w-[800px] h-[278px] absolute bottom-16 flex space-x-[-50px]">
    {#each mockupOwnHand as card}
       <Card {card} />
    {/each}
  </div>
</div>

<style>
	:global(body) {
		overscroll-behavior-y: contain;
	}
</style>
