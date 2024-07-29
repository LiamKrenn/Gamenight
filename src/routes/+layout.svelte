<script lang="ts">
	import AccountDropdown from './AccountDropdown.svelte';

	import Navlogo from '$lib/icons/nav/navlogo.svelte';
	import Navtext from '$lib/icons/nav/navtext.svelte';
	import { AlignJustify, Bell, Gamepad2, MessageCircle } from 'lucide-svelte';
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import Navitems from '$lib/components/navitems.svelte';
	import { page } from '$app/stores';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { PageData } from './$types';
	import MessageCircleActive from '$lib/icons/mobnav/message-circle-active.svg?raw';
	import MessageCircleInactive from '$lib/icons/mobnav/message-circle-inactive.svg?raw';
	import Gamepad_2Active from '$lib/icons/mobnav/gamepad-2-active.svg?raw';
	import Gamepad_2Inactive from '$lib/icons/mobnav/gamepad-2-inactive.svg?raw';
	import ShoppingCartActive from '$lib/icons/mobnav/shopping-cart-active.svg?raw';
	import ShoppingCartInactive from '$lib/icons/mobnav/shopping-cart-inactive.svg?raw';
	import UsersActive from '$lib/icons/mobnav/users-active.svg?raw';
	import UsersInactive from '$lib/icons/mobnav/users-inactive.svg?raw';

	export let data: PageData;

	const routes: string[][] = [
		['Games', '/games'],
		['Shop', '/shop'],
		['Friends', '/friends']
	];
</script>

<title>Gamenight</title>

<div class="flex h-full w-full flex-col">
	<div class="cshadow flex h-16 w-full shrink-0 items-center justify-between">
		<div class="flex items-center">
			<AlignJustify
				class="m-2 mr-0 h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700"
			/>
			<a
				href="/"
				class="ml-1 hidden items-center rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700 logo:flex"
			>
				<Navlogo />
				<Navtext class="ml-2" />
			</a>
			<div class="hidden mobile:flex">
				<Navitems id={$page.route.id} {routes} />
			</div>
		</div>
		<div class="flex items-center">
			<MessageCircle
				class="m-2 hidden h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700 mobile:flex"
			/>
			<Bell class="h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700" />

			<AccountDropdown user={data.user}></AccountDropdown>
		</div>
	</div>
  <div class="h-full">
    <slot />
  </div>
	<div
		class="flex h-20 w-full shrink-0 items-center justify-between space-x-4 border-t-2 border-slate-700 px-[6%] sm:px-[10%] mobile:hidden"
	>
		<a href="/games" class="h-12 w-12">
			{#if $page.route.id === '/games'}
				{@html Gamepad_2Active}
			{:else}
				{@html Gamepad_2Inactive}
			{/if}
		</a>

		<a href="/chats" class="h-12 w-12">
			{#if $page.route.id === '/chats'}
				{@html MessageCircleActive}
			{:else}
				{@html MessageCircleInactive}
			{/if}
		</a>

		<a href="/shop" class="h-12 w-12">
			{#if $page.route.id === '/shop'}
				{@html ShoppingCartActive}
			{:else}
				{@html ShoppingCartInactive}
			{/if}
		</a>

		<a href="/friends" class="h-12 w-12">
			{#if $page.route.id === '/friends'}
				{@html UsersActive}
			{:else}
				{@html UsersInactive}
			{/if}
		</a>
	</div>
</div>

<style>
	:global(.cshadow) {
		box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
</style>
