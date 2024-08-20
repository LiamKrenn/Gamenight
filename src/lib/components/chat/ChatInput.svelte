<script lang="ts">
	import { Send } from 'lucide-svelte';
	import { chatClient, chatMessageInput } from '$lib/stores';
	import Input from '../ui/input/input.svelte';
	import Button from '../ui/button/button.svelte';
</script>

<form on:submit|preventDefault={$chatClient.sendMessage} class="mt-2 flex h-10 w-full grow px-2">
	<Input
		placeholder="Message"
		class="focusring mr-2 h-10 w-full rounded-lg border-none bg-slate-600"
		bind:value={$chatMessageInput}
	/>
	<Button
		variant="secondary"
		on:click={$chatClient.sendMessage}
		class="h-10 w-10 shrink-0 rounded-lg bg-sky-600 p-0 hover:bg-sky-700"
	>
		<Send />
	</Button>
</form>
