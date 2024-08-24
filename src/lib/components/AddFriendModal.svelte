<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Send } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { page } from '$app/stores';

	let username = '';
	let open = true || $page.url.searchParams.get('open') === 'true';
	let errorMessage = '';
	$: if (open) {
		username = '';
		errorMessage = '';
	}
	export let onSuccess = () => {};

	let block = false;
	async function sendRequest() {
		if (username === '') {
			errorMessage = 'Username cannot be empty';
			return;
		}
		if (block) return;
		errorMessage = '';
		block = true;

		let resp = await fetch('/friends/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action: 'send',
				username: username
			})
		});
		if (resp.status === 200) {
			onSuccess();
			open = false;
		} else {
			errorMessage = 'User not found';
		}
		setTimeout(() => {
			block = false;
		}, 500);
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<slot />
	</Dialog.Trigger>
	<Dialog.Content class="!w-96 !max-w-[90%] rounded-lg border-slate-700 bg-slate-800 p-4">
		<Dialog.Header>
			<Dialog.Title class=" text-start text-3xl 2xs:text-center">Add a Friend</Dialog.Title>
		</Dialog.Header>
		<form on:submit|preventDefault={sendRequest}>
			<p class="mb-2 w-full text-start">Username</p>
			<Input bind:value={username} class="focusring bg-slate-900" placeholder="ex. Jeff" />
			{#if errorMessage != ''}
				<p class="-mb-1.5 mt-2 font-semibold text-red-400">{errorMessage}</p>
			{/if}
		</form>

		<Dialog.Footer>
			<Button
				on:click={sendRequest}
				variant="secondary"
				class="w-full bg-slate-700 hover:bg-slate-600">Send Request <Send class="ml-2" /></Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>
