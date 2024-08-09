<script lang="ts">
	import AddFriendModal from '$lib/components/AddFriendModal.svelte';

	import OutgoingRequest from './OutgoingRequest.svelte';

	import * as Tabs from '$lib/components/ui/tabs';

	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { UserPlus } from 'lucide-svelte';
	import IncomingRequest from './IncomingRequest.svelte';

	export let data: PageData;

	let value = 'incoming';

	async function refreshData() {
		let resp = await fetch('/friends/requests');
		data = await resp.json();
	}
</script>

<div class="flex h-full w-full items-start justify-center py-8">
	<div class="flex w-96 flex-col items-center">
		<div class="flex">
			<h1 class="mr-4 mt-0.5 text-4xl font-semibold">Friend Request</h1>
			<AddFriendModal onSuccess={refreshData}>
				<Button
					variant="ghost"
					class="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-sky-700 p-0 hover:bg-sky-700"
				>
					<UserPlus class="h-8 w-8" />
				</Button>
			</AddFriendModal>
		</div>

		<Tabs.Root {value} class="h-min w-full ">
			<Tabs.List class="mt-6 w-full bg-slate-700">
				<Tabs.Trigger
					on:click={refreshData}
					class="w-full data-[state=active]:bg-slate-800"
					value={'incoming'}
				>
					Incoming ({data.incoming?.length || 0})
				</Tabs.Trigger>
				<Tabs.Trigger
					on:click={refreshData}
					class="w-full data-[state=active]:bg-slate-800"
					value={'outgoing'}
				>
					Outgoing ({data.outgoing?.length || 0})
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="incoming">
				<!-- INCOMING -->
				{#each data.incoming || [] as request}
					<IncomingRequest {request} {refreshData} />
				{/each}
			</Tabs.Content>
			<Tabs.Content value="outgoing">
				<!-- OUTGOING -->
				{#each data.outgoing || [] as request}
					<OutgoingRequest {request} {refreshData} />
				{/each}
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
