import { persisted } from 'svelte-persisted-store';
import { mediaQuery } from 'svelte-legos';
import { get, writable } from 'svelte/store';
import type ChatClient from 'chat-client-delta';
import type { ChatMessage } from './chat';
import type { User } from './types';

const isDesktop = mediaQuery('(min-width: 850px)');

export const user = writable<null | User>(null);

export const openSidebar = persisted('sidebarOpen', false);
export const openChat = persisted('chatOpen', false);
export const disableModals = ['/login', '/signup', '/forgot-password'];

// Chat Module
export const chatClient = writable<ChatClient | null>(null);
export const messages = writable<ChatMessage[]>([]);
export const current_match_chat_id = writable<string | null>(null);
//

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
