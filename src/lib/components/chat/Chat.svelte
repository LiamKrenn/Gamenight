<script lang="ts">
	import ChatPopupFriends from './ChatPopupFriends.svelte';
	import ChatInput from './ChatInput.svelte';
	import ChatMessages from './ChatMessages.svelte';
	import { onMount } from 'svelte';
	import { friends, openChat } from '$lib/stores';
	import { ChevronRight, UserPlus, X } from 'lucide-svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { chatClient, chatConnected, chatFriendUserId } from '$lib/stores';
	import ChatLoading from './ChatLoading.svelte';
	import Button from '../ui/button/button.svelte';

	export let sidebar: boolean = false;

	let chatArea: HTMLDivElement;
	let chatViewport: HTMLElement;

	function scrollToBottom() {
		chatViewport.scrollTop = chatViewport.scrollHeight;
	}

	onMount(async () => {
		if (!$chatConnected) {
			await $chatClient.connectClient();
		}
		$chatClient.addMessageCallback(scrollToBottom);
	});

	$: if (chatArea != undefined) {
		const osInstance = OverlayScrollbars(chatArea, {
			scrollbars: {
				theme: 'os-theme-chat'
			}
		});
		chatViewport = osInstance.elements().viewport;
	}
</script>

{#if sidebar}
	<ChatLoading>
		<div class="mt-4 space-y-2">
			{#each $friends || [] as friend}
				<Button
					variant="outline"
					class="h-12 w-full justify-start rounded-lg border-slate-700 bg-slate-800 py-0 pl-2 pr-0 text-slate-100 hover:bg-slate-700"
				>
					<p class="w-24 shrink-0 xs:w-32">{friend.username}</p>
					<p class="w-full overflow-hidden overflow-ellipsis text-left text-slate-500">
						Last message bla bla bla bla bla bla bla bla
					</p>
					<ChevronRight class="h-10 w-10 shrink-0 rounded-lg stroke-slate-300 p-2" />
				</Button>
			{/each}
		</div>
	</ChatLoading>
{:else}
	<div class="flex h-full">
		<div class="h-full w-32 shrink-0 space-y-2 border-r-[1px] border-slate-600 p-2">
			<ChatPopupFriends {scrollToBottom} />
		</div>
		<div class="flex h-full w-full grow-0 flex-col justify-between p-0">
			<ChatLoading>
				<!-- Chat -->
				{#if $chatFriendUserId}
					<div class="h-full max-h-full w-full">
						<div bind:this={chatArea} class=" h-[388px] max-h-[388px] max-w-[272px] px-2 pt-2">
							<div class="max-w-[272px] space-y-2">
								<ChatMessages />
							</div>
						</div>

						<ChatInput />
					</div>
				{:else}
					<p class="m-2">Select a friend to start a conversation!</p>
				{/if}
			</ChatLoading>
		</div>
	</div>
{/if}

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}

	:global(.os-theme-chat) {
		--os-size: 8px;
		--os-padding-perpendicular: 3px;
		--os-padding-axis: 0px;
		--os-handle-bg: #64748b80;
		--os-handle-bg-hover: #64748b80;
		--os-handle-bg-active: #64748b80;
		--os-handle-interactive-area-offset: 24px;
		--os-handle-border-radius: 0.5rem;
		--os-handle-min-size: 32px;
	}
</style>
