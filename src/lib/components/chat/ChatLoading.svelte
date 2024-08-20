<script>
	import { chatClient, chatErrorConnectingClient, chatLoading } from '$lib/stores';
	import { CloudOff, RefreshCw } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
</script>

{#if $chatLoading}
	<div class="flex w-full items-center justify-center p-3 text-slate-400">
		<RefreshCw class="mr-3 h-8 w-8 shrink-0 animate-spin stroke-slate-400" />
		Connecting...
	</div>
{:else if $chatErrorConnectingClient}
	<div class="flex h-full w-full flex-col items-center p-3">
		<CloudOff class="my-2 h-8 w-full stroke-red-400" />
		<p class="mb-2 text-center font-semibold text-red-400">
			There was an error connecting to the chat server.
		</p>
		<Button class="w-full max-w-96" on:click={$chatClient.connectClient}>Try again</Button>
	</div>
{:else}
	<slot />
{/if}
