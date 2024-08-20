<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		ChevronLeft,
		Bot,
		Smartphone,
		Computer,
		Tablet,
		CircleHelp,
		Trash2,
		RefreshCw
	} from 'lucide-svelte';
	import type { PageData } from './$types';
	import { ezauthURL } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data: PageData;

	let errorMessage = '';
	let toBeDeleted = '';
	let loading = false;

	async function reloadSessions() {
		loading = true;
		let response = await fetch('/manage-sessions');
		if (response.status == 200) {
			data.sessions = (await response.json()).sessions;
		} else {
			errorMessage = 'An error occurred while fetching the sessions.';
		}
		loading = false;
	}

	async function deleteSession(id: string) {
		errorMessage = '';
		toBeDeleted = id;
		let response = await fetch(`/manage-sessions/${id}`, {
			method: 'DELETE'
		});
		if (response.status == 200) {
			await reloadSessions();
		} else {
			errorMessage = 'An error occurred while deleting the session.';
			toBeDeleted = '';
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<h1 class="we-full my-6 text-center text-5xl font-semibold">Manage Sessions</h1>

	<div class="mt-2 w-[90%] max-w-72">
		<div class="flex w-full">
			<a href="/profile" class="w-full">
				<Button variant="secondary" class="mb-2 w-full bg-slate-700 hover:bg-slate-700/70">
					<ChevronLeft /> Back
				</Button>
			</a>
			<Button
				on:click={reloadSessions}
				variant="secondary"
				class="mb-2 ml-2 w-min bg-slate-700 p-2 hover:bg-slate-700/70"
			>
				<RefreshCw class={loading ? 'animate-spin' : ''} />
			</Button>
		</div>

		{#if errorMessage != ''}
			<p class="mb-2 text-red-400">{errorMessage}</p>
		{/if}

		{#each data.sessions as session, i}
			<div
				class="relative my-2 flex h-fit w-full items-center justify-start rounded-lg bg-slate-700 py-1
        {toBeDeleted == session._id ? 'opacity-50' : ''}
        "
			>
				{#if session.device_information.is_bot}
					<Bot class="mx-4 flex-shrink-0" />
				{:else if session.device_information.is_mobile}
					<Smartphone class="mx-4 flex-shrink-0" />
				{:else if session.device_information.is_pc}
					<Computer class="mx-4 flex-shrink-0" />
				{:else if session.device_information.is_tablet}
					<Tablet class="mx-4 flex-shrink-0" />
				{:else}
					<CircleHelp class="mx-4 flex-shrink-0" />
				{/if}

				<div class="mr-12 w-full">
					<div class="flex w-full justify-between">
						<p class="font-semibold">
							{session.device_information.device_name}
						</p>
						<p class="text-slate-400">
							{new Date(session.createdAt).toISOString().slice(5, 10).replace('-', '.')}
							{new Date(session.createdAt).toISOString().slice(11, 16).replace('-', '.')}
						</p>
					</div>

					<p class="text-slate-400">
						{session.device_information.os_name}
					</p>
					<p class="text-slate-400">
						{session.device_information.browser_name}
					</p>
				</div>
				<div class="absolute right-0 top-0 h-full w-12 px-1.5 py-1.5">
					<button
						on:click={async () => {
							await deleteSession(session._id);
						}}
						disabled={toBeDeleted == session._id}
						class="flex h-full w-full items-center justify-center rounded-lg {toBeDeleted ==
						session._id
							? ''
							: 'hover:bg-slate-600'} "
					>
						<Trash2 class="{toBeDeleted == session._id ? '' : 'Trash2'} duration-0" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	:global(button:hover .Trash2) {
		@apply stroke-red-500;
	}
</style>
