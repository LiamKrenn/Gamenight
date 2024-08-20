<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Request, User } from '$lib/types';
	import { ArrowLeft, MessageCircle, Trash2, UserMinus } from 'lucide-svelte';
	import { chatClient, openChat } from '$lib/stores';

	export let friend: Request;
	export let user: User | null;
	export let refreshData: () => void;

	let realFriend =
		user != null && friend.receiver.username === user.username ? friend.sender : friend.receiver;

	let sure = false;
	let hide = false;

	async function removeFriend() {
		hide = true;
		let resp = await fetch('/friends/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action: 'remove',
				request_id: friend.request_id
			})
		});
		if (resp.status === 204) {
			refreshData();
		} else {
			hide = false;
		}
	}
</script>

{#if !hide}
	<div
		class="relative mb-2 flex h-12 w-full flex-row items-center rounded-lg bg-slate-700 px-3 text-lg"
	>
		<a class="underline underline-offset-2" href="/profile/{realFriend.username}"
			>{realFriend.username}</a
		>

		{#if sure}
			<Button
				on:click={() => {
					sure = false;
				}}
				variant="ghost"
				class="absolute right-12 p-2 hover:bg-slate-600 "
			>
				<ArrowLeft />
			</Button>

			<Button
				on:click={async () => {
					removeFriend();
				}}
				variant="ghost"
				class="absolute right-1 p-2 hover:bg-slate-600 "
			>
				<Trash2 />
			</Button>
		{:else}
			<Button
				on:click={() => {
					$openChat = true;
					$chatClient.startChat(realFriend.username);
				}}
				variant="ghost"
				class="absolute right-12 p-2 hover:bg-slate-600 "
			>
				<MessageCircle />
			</Button>

			<Button
				on:click={async () => {
					sure = true;
				}}
				variant="ghost"
				class="absolute right-1 p-2 hover:bg-slate-600 "
			>
				<UserMinus />
			</Button>
		{/if}
	</div>
{/if}
