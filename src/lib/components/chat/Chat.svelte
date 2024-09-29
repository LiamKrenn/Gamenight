<script lang="ts">
	import ChatSidebarFriends from './ChatSidebarFriends.svelte';
	import ChatPopupFriends from './ChatPopupFriends.svelte';
	import ChatInput from './ChatInput.svelte';
	import ChatMessages from './ChatMessages.svelte';
	import { onMount } from 'svelte';
	import { chatFriendName, friends, openChat } from '$lib/stores';
	import { ChevronLeft, ChevronRight, UserPlus, X } from 'lucide-svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { chatClient, chatConnected, chatFriendUserId } from '$lib/stores';
	import ChatLoading from './ChatLoading.svelte';
	import Button from '../ui/button/button.svelte';
	import ProfilePicture from '../ProfilePicture.svelte';

	export let sidebar: boolean = false;

	let chatArea: HTMLDivElement;
	let chatViewport: HTMLElement;

	function scrollToBottom() {
		chatViewport.scrollTop = chatViewport.scrollHeight;
	}

	onMount(() => {
		if (!$chatClient.messageCallbacks.includes(scrollToBottom)) {
			$chatClient.addMessageCallback(scrollToBottom);
		}
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
		<div class="mb-2 mt-3 h-full max-h-full space-y-2 overflow-hidden">
			{#if !$chatFriendUserId}
				<ChatSidebarFriends {scrollToBottom} />
			{/if}
			{#if $chatFriendUserId}
				<div class="flex h-full flex-col justify-between">
					<div class="mx-4">
						<button
							class="flex w-full items-center justify-between rounded-lg border border-slate-700 p-2 hover:bg-slate-700"
							on:click={() => {
								chatFriendUserId.set('');
								$chatFriendName = '';
							}}
						>
							<ChevronLeft />
							<div class="flex items-center">
								<ProfilePicture id={$chatFriendUserId} class=" mr-2 h-6 w-6 rounded-full" />
								<p class="text-slate-100">{$chatFriendName}</p>
							</div>
							<ChevronLeft class="invisible" />
						</button>
					</div>

					<div bind:this={chatArea} class="mx-1 mt-2 h-full pt-2">
						<div class="mx-3 h-full space-y-2">
							<ChatMessages />
						</div>
					</div>

					<div class="mx-2 mb-2">
						<ChatInput />
					</div>
				</div>
			{/if}
		</div>
	</ChatLoading>
{:else}
	<div class="flex h-full">
		<div
			class="h-[444px] max-h-[444px] w-40 shrink-0 overflow-hidden border-r-[1px] border-slate-600"
		>
			<ChatPopupFriends {scrollToBottom} />
		</div>
		<div class="flex h-full w-full grow-0 flex-col justify-between p-0">
			<ChatLoading>
				<!-- Chat -->
				{#if $chatFriendUserId}
					<div class="h-full max-h-full w-full">
						<div bind:this={chatArea} class=" h-[388px] max-h-[388px] px-2 pt-2">
							<div class="space-y-2">
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
