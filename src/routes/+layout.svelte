<script lang="ts">
  import AccountDropdown from './AccountDropdown.svelte';

	import Navlogo from '$lib/icons/nav/navlogo.svelte';
	import Navtext from '$lib/icons/nav/navtext.svelte';
	import { AlignJustify, Bell, MessageCircle, User, LogIn, LogOut, UserPlus, Gamepad2, ShoppingCart, Users } from 'lucide-svelte';
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import Navitems from '$lib/components/navitems.svelte';
	import { page } from '$app/stores';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { PageData } from './$types';

	export let data: PageData;

	const routes: string[][] = [
		['Games', '/games'],
		['Shop', '/shop'],
		['Friends', '/friends']
	];
</script>

<title>Gamenight</title>

<div class="flex h-full w-full flex-col">
	<div class="cshadow flex h-16 w-full items-center justify-between shrink-0">
		<div class="flex items-center">
			<AlignJustify
				class="m-2 mr-0 h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700"
			/>
			<a
				href="/"
				class="ml-1 items-center rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700 logo:flex hidden"
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
				class="mobile:flex hidden m-2 h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700"
			/>
			<Bell class="h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700" />

			<AccountDropdown user={data.user}></AccountDropdown>
		</div>
	</div>
	<slot />
  <div class="h-20 shrink-0 w-full mobile:hidden flex border-t-2 border-slate-700 items-center justify-between sm:px-[10%] px-[6%] space-x-4">
    <Gamepad2      class="w-12 h-12" strokeWidth="1.75px"/>
    <MessageCircle class="w-12 h-12" strokeWidth="1.75px"/>
    <ShoppingCart  class="w-12 h-12" strokeWidth="1.75px"/>
    <Users         class="w-12 h-12" strokeWidth="1.75px"/>

  </div>
</div>

<style>
	:global(.cshadow) {
		box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
</style>
