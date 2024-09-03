<script lang="ts">
	import { chatFriendName, friends } from '$lib/stores';
	import { chatClient, chatFriendUserId } from '$lib/stores';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { ChevronRight } from 'lucide-svelte';

	export let scrollToBottom: () => void;

	let friendArea: HTMLDivElement;
	onMount(() => {
		const osInstance = OverlayScrollbars(friendArea, {
			scrollbars: {
				theme: 'os-theme-default'
			}
		});
	});
</script>

<div class="h-full max-h-full pb-2" bind:this={friendArea}>
	<div class="mx-4 space-y-2">
		{#each $friends || [] as friend}
			<Button
				variant="outline"
				class="h-12 w-full justify-start rounded-lg border-slate-700 bg-slate-800 py-0 pl-2 pr-0 text-slate-100 hover:bg-slate-700"
				on:click={async () => {
					$chatFriendName = friend.username;
					await $chatClient.startChat(friend._id);
					scrollToBottom();
				}}
			>
				<p class="w-24 shrink-0 xs:w-32">{friend.username}</p>
				<p class="w-full overflow-hidden overflow-ellipsis text-left text-slate-500">
					Last message bla bla bla bla bla bla bla bla
				</p>
				<ChevronRight class="h-10 w-10 shrink-0 rounded-lg stroke-slate-300 p-2" />
			</Button>
		{/each}
	</div>
</div>
