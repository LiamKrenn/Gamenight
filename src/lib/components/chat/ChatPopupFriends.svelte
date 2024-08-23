<script lang="ts">
	import { friends } from '$lib/stores';
	import { chatClient, chatFriendUserId } from '$lib/stores';
	import Button from '../ui/button/button.svelte';

	export let scrollToBottom: () => void;
</script>

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
