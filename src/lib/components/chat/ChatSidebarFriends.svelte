<script lang="ts">
	import { chatFriendName, friends } from '$lib/stores';
	import { chatClient, chatFriendUserId } from '$lib/stores';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { ChevronRight } from 'lucide-svelte';
	import { PUBLIC_AUTH_URL } from '$env/static/public';
	import ProfilePicture from '../ProfilePicture.svelte';

	export let scrollToBottom: () => void;

	let friendArea: HTMLDivElement;
	onMount(() => {
		const osInstance = OverlayScrollbars(friendArea, {
			scrollbars: {
				theme: 'os-theme-default'
			}
		});
	});

	let test = true;
</script>

<div class="h-full max-h-full pb-2" bind:this={friendArea}>
	<table class="w-full table-auto border-separate border-spacing-x-0 border-spacing-y-2 px-4">
		{#each $friends || [] as friend}
			<tr
				class="tr-round h-12 w-full cursor-pointer justify-start rounded-lg bg-slate-800 py-0 text-slate-100 hover:bg-slate-700"
				on:click={async () => {
					await $chatClient.startChat(friend._id);
					scrollToBottom();
				}}
			>
				<td class="w-12 min-w-12 pl-2">
					<ProfilePicture id={friend._id} class="h-8 w-8 rounded-full" />
				</td>

				<td class="-3xs:table-ellipsis pr-2">
					<div>
						<p>{friend.username}</p>
					</div>
				</td>

				<td class="table-ellipsis hidden !h-full !w-full 3xs:table-cell">
					<div>
						<p class="text-slate-500">Last message bla bla bla bla bla bla bla bla</p>
					</div>
				</td>
				<td class="w-10">
					<ChevronRight class="h-10 w-10 shrink-0 rounded-lg stroke-slate-300 p-2" />
				</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	.tr-round > td:first-child {
		@apply rounded-l-lg border border-slate-700 border-r-transparent;
	}

	.tr-round > td {
		@apply border border-slate-700 border-x-transparent;
	}

	.tr-round > td:last-child {
		@apply rounded-r-lg border border-slate-700 border-l-transparent;
	}

	.table-ellipsis {
		@apply !h-full;
	}

	.table-ellipsis > div {
		@apply relative flex !h-full items-center justify-center;
	}

	.table-ellipsis > div::before {
		content: '\00a0';
	}

	.table-ellipsis > div > p {
		@apply absolute left-0 right-0 top-0 h-full overflow-hidden overflow-ellipsis whitespace-nowrap;
	}
</style>
