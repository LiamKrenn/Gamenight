<script lang="ts">
	import { friends } from '$lib/stores';
	import { chatClient, chatFriendUserId } from '$lib/stores';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';

	export let scrollToBottom: () => void;

	let friendArea: HTMLDivElement;
	onMount(() => {
		const osInstance = OverlayScrollbars(friendArea, {
			scrollbars: {
				theme: 'os-theme-chat'
			}
		});
	});
</script>

<div class="ml-2 mt-2 h-full pb-4" bind:this={friendArea}>
	<div class="mr-2 space-y-2">
		{#each $friends || [] as friend}
			{#if friend.username === $chatFriendUserId}
				<Button
					variant="outline"
					class="w-full border-slate-600 bg-slate-600 text-slate-100 hover:bg-slate-600"
					>{friend.username}</Button
				>
			{:else}
				<Button
					on:click={async () => {
						await $chatClient.startChat(friend._id);
						scrollToBottom();
					}}
					variant="outline"
					class="w-full border-slate-600 bg-slate-700 text-slate-100 hover:bg-slate-600"
					>{friend.username}</Button
				>
			{/if}
		{/each}
	</div>
</div>
