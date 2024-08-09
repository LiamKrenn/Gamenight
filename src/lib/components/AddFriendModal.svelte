<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Send } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';

	let username = '';
	let open = false;
  let errorMessage = '';
	$: if (open) {
		username = '';
    errorMessage = ''
	}
  export let onSuccess = () => {};

	async function sendRequest() {
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
      errorMessage = 'User not found'
    }
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<slot />
	</Dialog.Trigger>
	<Dialog.Content class="border-slate-700 bg-slate-800">
		<Dialog.Header>
			<Dialog.Title class=" text-3xl">Add a Friend</Dialog.Title>
		</Dialog.Header>
    <form on:submit|preventDefault={sendRequest}>
      <p class="w-full text-start mb-2">Username</p>
      <Input bind:value={username} class="focusring bg-slate-900" placeholder="ex. Jeff" />
      {#if errorMessage != ''}
         <p class="text-red-400 font-semibold mt-2">{errorMessage}</p>
      {/if}
    </form>
    
		<Dialog.Footer>
			<Button
				on:click={sendRequest}
				variant="secondary"
				class="w-full bg-slate-700 hover:bg-slate-600">Send Request <Send class="ml-2"/></Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>
