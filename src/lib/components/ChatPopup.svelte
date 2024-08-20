<script lang="ts">
	import { Minus, UserPlus, X, ChevronRight, MessagesSquare } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { openChat } from '$lib/stores';
	import Sidebar from './Sidebar.svelte';
	import Chat from './Chat.svelte';
	import type { User } from '$lib/types';

	export let loggedIn: boolean;
</script>

<div
	class="fixed bottom-0 right-0 hidden h-[516px] w-[416px] overflow-hidden mobile:flex {$openChat
		? ''
		: `bottom-[-516px]`}"
>
	<div class="absolute left-0 flex h-[500px] w-[400px] flex-col rounded-lg bg-slate-700">
		<div class="cshadow flex h-14 w-full shrink-0 items-center justify-between pl-4 pr-2">
			<!-- Header -->
			<h2 class="text-2xl font-semibold">Chats</h2>
			<div class="flex">
				{#if loggedIn}
					<a on:click={() => ($openChat = false)} href="/friends/requests?open=true">
						<UserPlus class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-600" />
					</a>
				{/if}
				<button on:click={() => ($openChat = false)}>
					<Minus class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-600" />
				</button>
			</div>
		</div>
		{#if loggedIn}
			<Chat />
		{:else}
			<div class="flex h-full w-full flex-col items-center justify-start">
				<MessagesSquare class="mt-24 h-32 w-32 stroke-slate-500 stroke-1" />
				<h3 class="mt-8 w-full text-center text-xl">
					Please
					<a class="underline" href="/login">log in</a>
					to chat.
				</h3>
			</div>
		{/if}
	</div>
</div>

<Sidebar class="top-0 flex mobile:hidden" width_full={true} open={$openChat}>
	{#if loggedIn}
		<Chat sidebar={true}/>
	{:else}
		<div class="flex h-full w-full flex-col items-center justify-start">
			<button class="absolute right-4 top-4" on:click={() => ($openChat = false)}>
				<X class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-700" />
			</button>
			<MessagesSquare class="mt-24 h-32 w-32 stroke-slate-500 stroke-1" />
			<h3 class="mt-8 w-full text-center text-xl">
				Please
				<a class="underline" href="/login">log in</a>
				to chat.
			</h3>
		</div>
	{/if}
</Sidebar>
