import { persisted } from 'svelte-persisted-store';
import { mediaQuery } from 'svelte-legos';
import { get, writable } from 'svelte/store';
import type { User } from './types';
import { ChatClientSingleton, type ChatMessage } from '$lib/chat';
import type ChatClient from 'chat-client-delta';

const isDesktop = mediaQuery('(min-width: 850px)');

export const user = writable<null | User>(null);

export const openSidebar = persisted('sidebarOpen', false);
export const openChat = persisted('chatOpen', false);
export const disableModals = ['/login', '/signup', '/forgot-password'];

export const friends = writable<User[] | null>(null);

export const chatUserID = writable<string>(get(user)?.username || '');
export const chatMessageInput = writable<string>('');
export const chatFriendUserId = writable<string>('');
export const chatMessages = writable<ChatMessage[]>([]);
export const chatAudioIsPlaying = writable<boolean>(false);
export const chatCurrent_match_chat_id = writable<string>('');
export const chatCurrentChatId = writable<string>('');
export const chatCurrentFriendId = writable<string>('');
export const chatLoading = writable<boolean>(false);
export const chatErrorConnectingClient = writable<boolean>(false);
export const chatConnected = writable<boolean>(false);
export const chatClient = writable<ChatClientSingleton>(new ChatClientSingleton());

// Close chat on mobile when both are opened
isDesktop.subscribe((value) => {
	if (!value && get(openSidebar) && get(openChat)) {
		openSidebar.set(true);
		openChat.set(false);
	}
});

// Toggle sidebar & chat on mobile
openSidebar.subscribe((value) => {
	if (!get(isDesktop) && value) {
		openChat.set(false);
	}
});

// Toggle sidebar & chat on mobile
openChat.subscribe((value) => {
	if (!get(isDesktop) && value) {
		openSidebar.set(false);
	}
});
