<script lang="ts">
	import { onMount } from 'svelte';
	import ChatClient from 'chat-client-delta';
	import Button from './ui/button/button.svelte';
	import type { User } from '$lib/types';
	import { backendURL } from '$lib';
	import { openChat, user } from '$lib/stores';
	import { ChevronRight, Send, UserPlus, X } from 'lucide-svelte';
	import { getFriendsFromRequests } from '$lib/friends';
	import Input from './ui/input/input.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { message } from 'sveltekit-superforms';

	export let sidebar: boolean = false;

	type AudioData = any;
	type ChatMessage = { message: string; chat_id: string; sender_id: string };
	type MatchChatData = { match_chat_id: string };
	type NotificationChatIds = any;
	type StartFriendChatResult = { chatId: string; oldMessages: ChatMessage[] };

	const ServerIP: string = '172.205.243.31';
	const Port: number = 8081;
	const UserID: string = $user?.username || '';

	let chatClient: ChatClient;
	let messageInput: string = '';
	let friendUserId: string = '';
	let messages: ChatMessage[] = [];
	let audioIsPlaying: boolean = false;
	let current_match_chat_id: string | null = null;
	let currentChatId = '';
	let currentFriendId: string = '';

	let friends: User[] = [];

	let errorConnectingClient = false;

	let chatArea: HTMLDivElement;
	let chatViewport: HTMLElement;

	function scrollToBottom() {
		chatViewport.scrollTop = chatViewport.scrollHeight;
	}

	async function connectClient() {
		let errorConnectingClient = false;

		chatClient = new ChatClient(ServerIP, Port, UserID);

		chatClient
			.connect()
			.then(async () => {
				console.log('Chat client connected');

				chatClient.setOnAudioMessageReceived((audioData: AudioData) => {
					console.log('Audio data received:', audioData);
				});

				chatClient.setOnChatMessageReceived((data: ChatMessage) => {
					console.log('New message received:', data);
					messages = [...messages, data];
					scrollToBottom();
				});

				chatClient.setOnMatchChat((data: MatchChatData) => {
					console.log('Match chat event triggered with user IDs:', data.match_chat_id);
					current_match_chat_id = data.match_chat_id;
				});

				chatClient.setNotificationChatIds((data: NotificationChatIds) => {
					console.log('New notification received:', data);
				});

				let friendRequests = await fetch('/friends').then((res) => res.json());
				friends = getFriendsFromRequests(friendRequests);
			})
			.catch((err) => {
				errorConnectingClient = true;
				console.error('Failed to connect chat client:', err);
			});
	}

	onMount(async () => {
		await connectClient();
	});

	$: if (chatArea != undefined) {
		const osInstance = OverlayScrollbars(chatArea, {
			scrollbars: {
				theme: 'os-theme-chat'
			}
		});
		chatViewport = osInstance.elements().viewport;
	}

	function startAudioCapture(): void {
		if (current_match_chat_id) {
			chatClient.startAudioCapture(current_match_chat_id);
		}
	}

	function stopAudioCapture(): void {
		chatClient.stopAudioCapture();
	}

	function activateAudio(): void {
		if (!audioIsPlaying) {
			chatClient.stop_playing = false;
			chatClient.playAudioQueue();
			audioIsPlaying = true;
		} else {
			chatClient.stop_playing = true;
			audioIsPlaying = false;
		}
	}

	async function startChat(friendId: string): Promise<void> {
		try {
			if (friendId == currentFriendId) {
				messages = [];
			}
			let { chatId, oldMessages }: StartFriendChatResult =
				await chatClient.startFriendChat(friendId);
			currentChatId = chatId;
			friendUserId = friendId;
			messages = oldMessages;
		} catch (err) {
			console.error('Failed to start friend chat:', err);
		}
	}

	function sendMessage(): void {
		chatClient.sendFriendMessage(currentChatId, messageInput);
		messageInput = '';
	}
</script>

{#if sidebar}
	<div class="flex h-full w-full flex-col p-4">
		<div class=" flex w-full shrink-0 items-center justify-between pl-2">
			<!-- Header -->
			<h2 class="text-2xl font-semibold">Chats</h2>
			<div class="flex">
				<a on:click={() => ($openChat = false)} href="/friends/requests">
					<UserPlus class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-700" />
				</a>
				<button on:click={() => ($openChat = false)}>
					<X class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-700" />
				</button>
			</div>
		</div>
		<div class="mt-4 space-y-2">
			{#each friends as friend}
				<Button
					variant="outline"
					class="h-12 w-full justify-start rounded-lg border-slate-700 bg-slate-800 py-0 pl-2 pr-0 text-slate-100 hover:bg-slate-700"
				>
					<p class="w-32">{friend.username}</p>
					<p class="w-full overflow-hidden overflow-ellipsis text-left text-slate-500">
						Last message bla bla bla bla bla bla bla bla
					</p>
					<ChevronRight class="h-10 w-10 shrink-0 rounded-lg stroke-slate-300 p-2" />
				</Button>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex h-full">
		<div class="h-full w-32 shrink-0 space-y-2 border-r-[1px] border-slate-600 p-2">
			{#each friends as friend}
				<Button
					on:click={async () => {
						await startChat(friend.username);
						scrollToBottom();
					}}
					variant="outline"
					class="w-full border-slate-600 bg-slate-700 text-slate-100 hover:bg-slate-600"
					>{friend.username}</Button
				>
			{/each}
		</div>
		<div class="flex h-full w-full grow-0 flex-col justify-between p-0">
			{#if errorConnectingClient}
				<p class="mb-2">There was an error connecting to the chat server.</p>
				<Button on:click={connectClient}>Try again</Button>
			{:else}
				<!-- Chat -->
				{#if friendUserId}
					<div class="h-full max-h-full w-full">
						<div bind:this={chatArea} class=" h-[388px] max-h-[388px] max-w-[272px] px-2 pt-2">
							<div class="max-w-[272px] space-y-2">
								{#each messages as message}
									{#if message.sender_id === UserID}
										<div
											class="right-0 ml-auto mr-0 flex w-fit max-w-[80%] items-center rounded-xl rounded-br-sm bg-sky-600 px-3 py-2"
										>
											<p class="max-w-full break-words">
												{message.message}
											</p>
										</div>
									{:else}
										<div
											class="left-0 flex w-fit max-w-[80%] items-center rounded-xl rounded-bl-sm bg-slate-600 px-3 py-2"
										>
											<p class="max-w-full break-words">{message.message}</p>
										</div>
									{/if}
								{:else}
									<p class="m-2">
										Start your conversation with {friendUserId}!
									</p>
								{/each}
							</div>
						</div>

						<form on:submit|preventDefault={sendMessage} class="mt-2 flex h-10 w-full grow px-2">
							<Input
								placeholder="Message"
								class="focusring mr-2 h-10 w-full rounded-lg border-none bg-slate-600"
								bind:value={messageInput}
							/>
							<Button
								variant="secondary"
								on:click={sendMessage}
								class="h-10 w-10 shrink-0 rounded-lg bg-sky-600 p-0 hover:bg-sky-700"
							>
								<Send />
							</Button>
						</form>
					</div>
				{:else}
					<p class="m-2">Select a friend to start a conversation!</p>
				{/if}
			{/if}
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
