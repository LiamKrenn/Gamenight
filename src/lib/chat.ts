import {
	user,
	chatAudioIsPlaying,
	chatConnected,
	chatCurrentChatId,
	chatCurrentFriendId,
	chatCurrent_match_chat_id,
	chatErrorConnectingClient,
	chatFriendUserId,
	chatLoading,
	chatMessageInput,
	chatMessages,
	chatUserID,
	friends
} from '$lib/stores';
import ChatClient from 'chat-client-delta';
import { get } from 'svelte/store';
import { fetchFriends } from './friends';
import { PUBLIC_CHAT_URL } from '$env/static/public';

export type AudioData = any;
export type ChatMessage = { message: string; chat_id: string; sender_id: string };
export type MatchChatData = { match_chat_id: string };
export type NotificationChatIds = any;
export type StartFriendChatResult = { chatId: string; oldMessages: ChatMessage[] };

export class ChatClientSingleton {
	chatClient: ChatClient | null = null;
	messageCallbacks: ((message: ChatMessage) => void)[] = [];

	constructor() {
		chatUserID.set(get(user)?._id || '');
		chatMessageInput.set('');
		chatFriendUserId.set('');
		chatMessages.set([]);
		chatAudioIsPlaying.set(false);
		chatCurrent_match_chat_id.set('');
		chatCurrentChatId.set('');
		chatCurrentFriendId.set('');
		chatLoading.set(false);
		chatErrorConnectingClient.set(false);
		chatConnected.set(false);
	}

	public addMessageCallback(callback: (message: ChatMessage) => void): void {
		this.messageCallbacks.push(callback);
	}

	public async connectClient() {
		chatLoading.set(true);
		chatErrorConnectingClient.set(false);

		friends.set(await fetchFriends() || []);

		this.chatClient = new ChatClient(PUBLIC_CHAT_URL, get(chatUserID));
		if (this.chatClient === null) return;
		this.chatClient
			.connect()
			.then(async () => {
				if (this.chatClient !== null) {
					console.log('Chat client connected');
					chatLoading.set(false);
					chatConnected.set(true);

					this.chatClient.setOnAudioMessageReceived((audioData: AudioData) => {
						console.log('Audio data received:', audioData);
					});

					this.chatClient.setOnChatMessageReceived((data: ChatMessage) => {
						console.log('New message received:', data);
						chatMessages.set([...get(chatMessages), data]);
						this.messageCallbacks.forEach((callback) => callback(data));
					});

					this.chatClient.setOnMatchChat((data: MatchChatData) => {
						console.log('Match chat event triggered with user IDs:', data.match_chat_id);
						chatCurrent_match_chat_id.set(data.match_chat_id);
					});

					this.chatClient.setNotificationChatIds((data: NotificationChatIds) => {
						console.log('New notification received:', data);
					});
				}
			})
			.catch((err) => {
				chatErrorConnectingClient.set(true);
				chatLoading.set(false);
				console.error('Failed to connect chat client:', err);
			});

		setTimeout(() => {
			if (!get(chatConnected)) {
				// Timeout
				// Real timeout takes waayy too long
				chatErrorConnectingClient.set(true);
				chatLoading.set(false);
			}
		}, 5000)
		// Do something after 5 seconds

	}

	public startAudioCapture(): void {
		if (get(chatCurrent_match_chat_id) && this.chatClient) {
			this.chatClient.startAudioCapture(get(chatCurrent_match_chat_id));
		}
	}

	public stopAudioCapture(): void {
		if (this.chatClient) {
			this.chatClient.stopAudioCapture();
		}
	}

	public activateAudio(): void {
		if (this.chatClient) {
			if (!get(chatAudioIsPlaying)) {
				this.chatClient.stop_playing = false;
				this.chatClient.playAudioQueue();
				chatAudioIsPlaying.set(true);
			} else {
				this.chatClient.stop_playing = true;
				chatAudioIsPlaying.set(false);
			}
		}
	}

	public async startChat(friendId: string): Promise<void> {
		if (this.chatClient) {
			try {
				if (get(chatCurrentFriendId) === friendId) {
					chatMessages.set([]);
				}
				let { chatId, oldMessages }: StartFriendChatResult =
					await this.chatClient.startFriendChat(friendId);
				chatCurrentChatId.set(chatId);
				chatFriendUserId.set(friendId);
				chatMessages.set(oldMessages);
			} catch (err) {
				console.error('Failed to start friend chat:', err);
			}
		}
	}

	public async sendMessage(): Promise<void> {
		if (this.chatClient) {
			this.chatClient.sendFriendMessage(get(chatCurrentChatId), get(chatMessageInput));
			chatMessageInput.set('');
		}
	}
}
