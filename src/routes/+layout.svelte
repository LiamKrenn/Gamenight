<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { News } from '$lib/news';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import 'overlayscrollbars/overlayscrollbars.css';
	import {
		chatClient,
		chatErrorConnectingClient,
		disableModals,
		friends,
		openChat,
		openSidebar,
		user
	} from '$lib/stores';
	import Navlogo from '$lib/icons/nav/navlogo.svelte';
	import Navtext from '$lib/icons/nav/navtext.svelte';
	import { OverlayScrollbars } from 'overlayscrollbars';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import Navitems from '$lib/components/NavItems.svelte';
	import MenuSidebarTabs from '$lib/components/MenuSidebarTabs.svelte';
	import AllMobNavItems from '$lib/components/AllMobNavItems.svelte';
	import AccountDropdown from '$lib/components/AccountDropdown.svelte';
	import {
		AlignJustify,
		ArrowDownToLine,
		ArrowLeft,
		Bell,
		LogIn,
		MessageCircle,
		User,
		X
	} from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { browser } from '$app/environment';
	import { fetchFriends } from '$lib/friends';
	import ChatPopup from '$lib/components/chat/ChatPopup.svelte';
	import MenuSidebar from '$lib/components/MenuSidebar.svelte';
	import { onlineStore } from 'svelte-legos';
	import LogoNoBackground from '$lib/icons/logo-no-background.svelte';
	import { set } from 'zod';
	import ProfilePicture from '$lib/components/ProfilePicture.svelte';

	export let data: PageData;

	const routes: string[][] = [
		['Games', '/games'],
		['Shop', '/shop'],
		['Friends', '/friends']
	];

	let isOnline: boolean;
	let isLoading = true;

	onlineStore().subscribe((value) => {
		isOnline = value;
	});

	$: loggedIn = $user != null || data.user != null;
	$: isInStandaloneMode = true;

	function isPwa() {
		var displayModes = ['fullscreen', 'standalone', 'minimal-ui'];
		return (
			displayModes.some(
				(displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
			) || document.referrer.includes('android-app://')
		);
	}

	let mainArea: HTMLDivElement;
	onMount(async () => {
		isInStandaloneMode = isPwa();

		user.subscribe(async (value) => {
			if (value) {
				if ($friends === null || $friends.length === 0) {
					await fetchFriends();
				}
				await $chatClient.connectClient();
			}
		});

		setTimeout(() => {
			isLoading = false;
		}, 600);

		$user = data.user;
		const osInstance = OverlayScrollbars(mainArea, {
			overflow: {
				x: 'hidden',
				y: 'scroll'
			},
			scrollbars: {
				theme: 'os-theme-default'
			}
		});
		if ($friends === null || $friends.length === 0) {
			await fetchFriends();
		}
	});

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

	$: if ($page.url.search.startsWith('?redirect') && browser) {
		document.location.href = $page.url.search.replace('?redirect=', '');
	}

	$: if (data.user) {
		$user = data.user;
	}

	$: hideNav = $page.url.href.includes('/game/');

	if (browser) {
		window.onerror = function (message, source, lineno, colno, error) {
			console.log('Error:', message, source, lineno, colno, error);
		};

		window.addEventListener('unhandledrejection', function (event) {
			console.log('Promise Rejection:', event);
		});

		window.addEventListener('error', function (event) {
			console.log('Error E:', event);
		});
	}
</script>

{#if !hideNav}
	<div class="flex h-full w-full flex-col">
		{#if isLoading}
			<div
				class="fade-out absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-800"
			>
				<LogoNoBackground class="scale-up-center h-[30%]" />
			</div>
		{/if}
		{#if isOnline}
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
						<AccountDropdown user={$user} {isInStandaloneMode}>
							<div
								class="m-2 h-12 w-12 rounded-lg p-1.5 duration-150 hover:cursor-pointer hover:bg-slate-700"
							>
								<ProfilePicture id={data.user?._id || 'default'} class="rounded-full " />
							</div>

							{#if !isInStandaloneMode}
								<div class="absolute right-3 top-2 z-30 h-3 w-3 rounded-full bg-sky-500"></div>
							{/if}
						</AccountDropdown>
					{:else}
						{#if !isInStandaloneMode}
							<a href="/install">
								<Button class="mr-3 rounded-lg bg-sky-700 p-2 pl-3 text-slate-50 hover:bg-sky-800">
									Install <ArrowDownToLine class="ml-1" />
								</Button>
							</a>
						{/if}
						<a href="/login">
							<Button class="mr-3 rounded-lg bg-sky-700 text-slate-50 hover:bg-sky-800">
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
				<MenuSidebar>
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
						<MenuSidebarTabs>
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
						</MenuSidebarTabs>
					</div>
				</MenuSidebar>

				<!-- Page -->
				<slot />
				<!-- Message Popup -->
				<ChatPopup {loggedIn} />
			</div>
			{#if !($page.url.pathname + '/').startsWith('/game/')}
				<!-- Footer for Mobile -->
				<div
					class="fshadow !z-40 flex h-16 w-full shrink-0 items-center justify-between bg-slate-800 mobile:hidden"
				>
					<AllMobNavItems />
				</div>
			{/if}
		{:else}
			offline
		{/if}
	</div>
{:else}
	<div class="relative h-full w-full">
		<Button
			class="absolute left-2 top-2 z-50 rounded-lg bg-slate-800/50 p-2 outline outline-2 outline-slate-700 hover:bg-slate-700/50"
			variant="secondary"
			href="/login"
			on:click={() => window.history.back()}
		>
			<ArrowLeft />
		</Button>
		<slot />
	</div>
{/if}

<style>
	:global(.cshadow) {
		box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
	:global(.fshadow) {
		box-shadow: 0px -2px 0px 0px #334155;
	}

	:global(.os-theme-default) {
		--os-size: 16px;
		--os-padding-perpendicular: 4px;
		--os-padding-axis: 6px;
		--os-handle-bg: #33415580;
		--os-handle-bg-hover: #33415580;
		--os-handle-bg-active: #33415580;
		--os-handle-interactive-area-offset: 16px;
		--os-handle-border-radius: 0.5rem;
		--os-handle-min-size: 32px;
	}

	:global(*) {
		transition-duration: 150ms;
	}

	:global(.fade-out) {
		-webkit-animation: fade-out 0.6s ease-out both;
		animation: fade-out 0.6s ease-out both;
	}

	:global(.scale-up-center) {
		-webkit-animation: scale-up-center 0.6s ease-in-out both;
		animation: scale-up-center 0.6s ease-in-out both;
	}

	@-webkit-keyframes fade-out {
		0% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fade-out {
		0% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@-webkit-keyframes scale-up-center {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
	@keyframes scale-up-center {
		0% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
</style>
