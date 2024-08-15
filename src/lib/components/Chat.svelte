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

	export let sidebar: boolean = false;

	type AudioData = any;
	type ChatMessage = { message: string };
	type MatchChatData = { match_chat_id: string };
	type NotificationChatIds = any;
	type StartFriendChatResult = { chatId: string; oldMessages: ChatMessage[] };

	const ServerIP: string = '172.205.243.31';
	const Port: number = 8081;
	const UserID: string = '1';

	let chatClient: ChatClient;
	let messageInput: string = '';
	let friendUserId: string = '';
	let messages: ChatMessage[] = [];
	let audioIsPlaying: boolean = false;
	let current_match_chat_id: string | null = null;
  let currentChatId = '';

	let friends: User[] = [];

	let errorConnectingClient = false;

	async function connectClient() {
		let friendRequests = await fetch('/friends').then((res) => res.json());
		friends = getFriendsFromRequests(friendRequests);

		chatClient = new ChatClient(ServerIP, Port, UserID);

		chatClient
			.connect()
			.then(() => {
				console.log('Chat client connected');

				chatClient.setOnAudioMessageReceived((audioData: AudioData) => {
					console.log('Audio data received:', audioData);
				});

				chatClient.setOnChatMessageReceived((data: { message: string }) => {
					console.log('New message received:', data);
					messages = [...messages, { message: data.message }];
				});

				chatClient.setOnMatchChat((data: MatchChatData) => {
					console.log('Match chat event triggered with user IDs:', data.match_chat_id);
					current_match_chat_id = data.match_chat_id;
				});

				chatClient.setNotificationChatIds((data: NotificationChatIds) => {
					console.log('New notification received:', data);
				});
			})
			.catch((err) => {
				errorConnectingClient = true;
				console.error('Failed to connect chat client:', err);
			});
	}

	onMount(async () => {
		await connectClient();
	});

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

	async function startChat(): Promise<void | ChatMessage[]> {
		if (friendUserId) {
			try {
				let { chatId, oldMessages }: StartFriendChatResult =
					await chatClient.startFriendChat(friendUserId);
        currentChatId = chatId;
				return oldMessages;
				console.log(`Friend chat ID: ${chatId}`);
				console.log('Old messages:', oldMessages);
			} catch (err) {
				console.error('Failed to start friend chat:', err);
			}
		} else {
			alert('Please enter a friend user ID.');
		}
	}

	function sendMessage(): void {
		chatClient.sendFriendMessage(currentChatId, messageInput);
    messages = [...messages, { message: messageInput }];
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
						friendUserId = friend.username;
						messages = await startChat();
					}}
					variant="outline"
					class="w-full border-slate-600 bg-slate-700 text-slate-100 hover:bg-slate-600"
					>{friend.username}</Button
				>
			{/each}
		</div>
		<div class="flex h-full w-full flex-col justify-between p-2 grow-0">
			{#if errorConnectingClient}
				<p class="mb-2">There was an error connecting to the chat server.</p>
				<Button on:click={connectClient}>Try again</Button>
			{:else}
				<!-- Chat -->

        
				{#if friendUserId}
        <div class="h-full max-h-full w-full">
          <div class=" space-y-2 max-h-[380px] h-[380px] overflow-y-auto">
						{#each messages as message}
              <div class="rounded-lg h-10 w-fit bg-slate-600 flex items-center px-3">
                {message[2]}
              </div>
						{:else}
							Start your conversation with {friendUserId}!
						{/each}
            
					</div>

          <div class="h-10 w-full flex grow mt-2">
              <Input class="h-10 bg-slate-600 border-none !focusring w-full mr-2 rounded-lg" bind:value={messageInput} />
              <Button variant="secondary" on:click={sendMessage} class="h-10 w-10 bg-sky-600 hover:bg-sky-700 p-0 shrink-0 rounded-lg">
                <Send/>
              </Button>
            </div>
        </div>
          

					
					
				{:else}
					Select a friend to start a conversation!
				{/if}
			{/if}
		</div>
	</div>
{/if}


<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>