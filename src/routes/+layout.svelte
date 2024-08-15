<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { News } from '$lib/news';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import 'overlayscrollbars/overlayscrollbars.css';
	import {
		chatClient,
		current_match_chat_id,
		disableModals,
		messages,
		openChat,
		openSidebar,

		user

	} from '$lib/stores';
	import Navlogo from '$lib/icons/nav/navlogo.svelte';
	import Navtext from '$lib/icons/nav/navtext.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import Navitems from '$lib/components/NavItems.svelte';
	import ChatPopup from '$lib/components/ChatPopup.svelte';
	import CustomTabs from '$lib/components/CustomTabs.svelte';
	import AllMobNavItems from '$lib/components/AllMobNavItems.svelte';
	import AccountDropdown from '$lib/components/AccountDropdown.svelte';
	import { AlignJustify, Bell, LogIn, MessageCircle, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: PageData;

	const routes: string[][] = [
		['Games', '/games'],
		['Shop', '/shop'],
		['Friends', '/friends']
	];

	import ChatClient from 'chat-client-delta';
	import type { AudioData, ChatMessage, MatchChatData, NotificationChatIds } from '$lib/chat';

	const ServerIP: string = '172.205.243.31';
	const Port: number = 8081;
	const UserID: string = '1';

	function connectChatClient() {
		$chatClient = new ChatClient(ServerIP, Port, UserID);

		$chatClient
			.connect()
			.then(() => {
				if ($chatClient === null) {
					throw new Error('Chat client is null');
				}
				console.log('Chat client connected');

				$chatClient.setOnAudioMessageReceived((audioData: AudioData) => {
					console.log('Audio data received:', audioData);
				});

				$chatClient.setOnChatMessageReceived((data: { message: string }) => {
					console.log('New message received:', data);
					$messages = [...$messages, { message: data.message }];
				});

				$chatClient.setOnMatchChat((data: MatchChatData) => {
					console.log('Match chat event triggered with user IDs:', data.match_chat_id);
					$current_match_chat_id = data.match_chat_id;
				});

				$chatClient.setNotificationChatIds((data: NotificationChatIds) => {
					console.log('New notification received:', data);
				});
			})
			.catch((err) => {
				console.error('Failed to connect chat client:', err);
			});
	}

	let mainArea: HTMLDivElement;
	onMount(() => {
    $user = data.user;
    connectChatClient();
		const osInstance = OverlayScrollbars(mainArea, {});
	});


	$: loggedIn = $user !== null;

	$: if (disableModals.includes($page.url.pathname)) {
		$openSidebar = false;
		$openChat = false;
	}

	openSidebar.subscribe((value) => {
		if (value && disableModals.includes($page.url.pathname)) {
			openSidebar.set(false);
		}
	});

	openChat.subscribe((value) => {
		if (value && disableModals.includes($page.url.pathname)) {
			openChat.set(false);
		}
	});
</script>

<title>Gamenight</title>

<div class="flex h-full w-full flex-col">
	<!-- Nav -->
	<div class="cshadow !z-40 flex h-16 w-full shrink-0 items-center justify-between">
		<div class="flex items-center">
			<button
				class="ml-2 h-12 w-12 rounded-lg p-2 hover:bg-slate-700"
				on:click={() => ($openSidebar = !$openSidebar)}
			>
				{#if $openSidebar}
					<X class="h-8 w-8" />
				{:else}
					<AlignJustify class="h-8 w-8" />
				{/if}
			</button>

			<a
				href="/"
				class="ml-1 hidden items-center rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700 logo:flex"
			>
				<Navlogo />
				<Navtext class="ml-2" />
			</a>
			<div class="hidden mobile:flex">
				<Navitems id={$page.url.pathname} {routes} />
			</div>
		</div>
		<div class="flex items-center">
			{#if loggedIn}
				<button on:click={() => ($openChat = !$openChat)}>
					<MessageCircle
						class="m-1 h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700 {$openChat
							? 'fill-slate-50'
							: ''}"
					/>
				</button>

				<Bell
					class="m-1 h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700"
				/>
				<AccountDropdown user={$user} />
			{:else}
				<a href="/login">
					<Button class="ml-1 mr-3 rounded-lg bg-sky-700 text-slate-50 hover:bg-sky-800">
						Sign In <LogIn class="ml-2" />
					</Button>
				</a>
			{/if}
		</div>
	</div>
	<div
		bind:this={mainArea}
		class="relative flex h-full shrink grow-0 flex-col overflow-y-auto"
		data-overlayscrollbars-initialize
	>
		<!-- Sidebar -->
		<Sidebar class="" open={$openSidebar}>
			<div class="flex h-full w-full flex-col p-4">
				<a
					href="/"
					class=" mb-4 flex h-min justify-center rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700 logo:hidden"
				>
					<button
						class="flex h-min max-w-full items-center"
						on:click={() => ($openSidebar = false)}
					>
						<Navlogo class="h-min" />
						<Navtext class="ml-2 h-min" />
					</button>
				</a>
				<CustomTabs>
					<div slot="news">
						<!-- News -->
						{#each News as news}
							<NewsCard {news} />
						{/each}
					</div>
					<div slot="leaderboard">
						<p>Leaderboard</p>
						<!-- TODO: implement -->
					</div>
				</CustomTabs>
			</div>
		</Sidebar>
		<!-- Page -->
		<slot />
		<!-- Message Popup -->
		<ChatPopup {loggedIn} />
	</div>
	{#if !($page.url.pathname + '/').startsWith('/game/')}
		<!-- Footer for Mobile -->
		<div class="fshadow !z-40 flex h-16 w-full shrink-0 items-center justify-between mobile:hidden">
			<AllMobNavItems />
		</div>
	{/if}
</div>

<style>
	:global(.cshadow) {
		box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
	:global(.fshadow) {
		box-shadow: 0px -2px 0px 0px #334155;
	}

	:global(.os-scrollbar) {
		--os-size: 16px;
		--os-padding-perpendicular: 4px;
		--os-padding-axis: 6px;
		--os-handle-bg: #33415580;
		--os-handle-bg-hover: #33415580;
		--os-handle-bg-active: #33415580;
		--os-handle-interactive-area-offset: 16px;
	}

	:global(*) {
		transition-duration: 150ms;
	}
</style>
