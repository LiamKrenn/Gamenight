<script lang="ts">
	import { friends } from '$lib/stores';
	import { chatClient, chatFriendUserId } from '$lib/stores';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { PUBLIC_AUTH_URL } from '$env/static/public';
	import ProfilePicture from '../ProfilePicture.svelte';

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
			<Button
				on:click={async () => {
					if (friend._id === $chatFriendUserId) return;
					await $chatClient.startChat(friend._id);
					scrollToBottom();
				}}
				variant="outline"
				class="w-full justify-start border-slate-600  px-1 text-slate-100 hover:bg-slate-600 {friend._id ===
				$chatFriendUserId
					? 'bg-slate-600'
					: 'bg-slate-700'}"
			>
				<ProfilePicture
					id={friend._id}
					class="left-1 mr-1.5 h-8 w-8 rounded-full"
				/>{friend.username}
			</Button>
		{/each}
	</div>
</div>
