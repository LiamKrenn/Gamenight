<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { X } from 'lucide-svelte';
	import type { Request } from '$lib/types';

	export let request: Request;
	export let refreshData: () => void;

	let hide = false;

	async function cancelOutgoingRequest(id: string) {
		hide = true;
		let resp = await fetch('/friends/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action: 'cancel',
				request_id: id
			})
		});
		if (resp.status === 204) {
			refreshData();
		} else {
			hide = false;
		}
	}
</script>

{#if !hide}
	<div
		class="relative mb-2 flex h-12 w-full flex-row items-center rounded-lg bg-slate-700 px-3 text-lg"
	>
		<span class="mr-2 text-slate-400">To:</span>
		<a
			class="font-semibold underline underline-offset-2"
			href="/profile/{request.receiver.username}">{request.receiver.username}</a
		>
		<Button
			on:click={async () => {
				await cancelOutgoingRequest(request.request_id);
			}}
			variant="ghost"
			class="absolute right-1 p-2 hover:bg-slate-600 "
		>
			<X />
		</Button>
	</div>
{/if}
