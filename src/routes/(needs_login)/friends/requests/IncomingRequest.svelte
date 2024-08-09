<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, Trash2, X, ArrowLeft } from 'lucide-svelte';
	import type { Request } from '$lib/types';

	export let request: Request;
	export let refreshData: () => void;

	let hide = false;

	async function declineRequest(id: string) {
		hide = true;
		let resp = await fetch('/friends/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action: 'decline',
				request_id: id
			})
		});
		if (resp.status === 204) {
			refreshData();
		} else {
			hide = false;
		}
	}

	async function acceptRequest(id: string) {
		let resp = await fetch('/friends/requests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action: 'accept',
				request_id: id
			})
		});
		if (resp.status === 204) {
			refreshData();
		} else {
			hide = false;
		}
	}

	let sure = false;
</script>

{#if !hide}
	<div
		class="relative mb-2 flex h-12 w-full flex-row items-center rounded-lg bg-slate-700 px-3 text-lg"
	>
		<span class="mr-2 text-slate-400">From:</span>
		<a class="font-semibold underline underline-offset-2" href="/profile/{request.sender.username}"
			>{request.sender.username}</a
		>
		<Button
			on:click={async () => {
				if (!sure) {
					sure = true;
				} else {
					await declineRequest(request.request_id);
				}
			}}
			variant="ghost"
			class="absolute right-12 p-2 hover:bg-slate-600 "
		>
			{#if sure}
				<Trash2 />
			{:else}
				<X />
			{/if}
		</Button>
		{#if !sure}
			<Button
				on:click={async () => {
					await acceptRequest(request.request_id);
				}}
				variant="ghost"
				class="absolute right-1 p-2 hover:bg-slate-600 "
			>
				<Check />
			</Button>
		{:else}
			<Button
				on:click={() => (sure = false)}
				variant="ghost"
				class="absolute right-1 p-2 hover:bg-slate-600 "
			>
				<ArrowLeft />
			</Button>
		{/if}
	</div>
{/if}
