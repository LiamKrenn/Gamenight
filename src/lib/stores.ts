import { persisted } from 'svelte-persisted-store';
import { mediaQuery } from 'svelte-legos';
import { get } from 'svelte/store';

const isDesktop = mediaQuery('(min-width: 850px)');

export const openSidebar = persisted('sidebarOpen', false);
export const openChat = persisted('chatOpen', false);
export const disableModals = ['/login', '/signup', '/forgot-password'];

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
