<script lang="ts">
	import AddFriendModal from '$lib/components/AddFriendModal.svelte';

	import OutgoingRequest from './OutgoingRequest.svelte';

	import * as Tabs from '$lib/components/ui/tabs';

	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { BookUser, UserPlus } from 'lucide-svelte';
	import IncomingRequest from './IncomingRequest.svelte';

	export let data: PageData;

	let value = 'incoming';

	async function refreshData() {
		let resp = await fetch('/friends/requests');
		data = await resp.json();
	}
</script>

<div class="flex h-full w-full items-start justify-center py-8">
	<div class="flex w-96 max-w-[90%] flex-col items-center">
		<div class="flex flex-col px-4 w-full">
			<h1 class="static mx-4 mt-0.5 text-center text-4xl font-semibold mobile:hidden">
				Friend Requests
			</h1>
			<div class="mt-6 flex items-start justify-evenly mobile:mt-0">
				<a href="/friends">
					<Button
						variant="ghost"
						class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-slate-700 p-2 hover:bg-slate-700 "
					>
						<BookUser class="h-8 w-8" />
					</Button>
				</a>
				<h1 class="mx-4 mt-0.5 hidden text-center text-4xl font-semibold mobile:block">
					Friend Requests
				</h1>
				<AddFriendModal onSuccess={refreshData}>
					<Button
						variant="ghost"
						class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg  bg-slate-700 p-2 hover:bg-slate-600 "
					>
						<UserPlus class="h-8 w-8" />
					</Button>
				</AddFriendModal>
			</div>
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
        {:else}
          <p class="w-full text-center">No incoming requests.</p>
				{/each}
			</Tabs.Content>
			<Tabs.Content value="outgoing">
				<!-- OUTGOING -->
				{#each data.outgoing || [] as request}
					<OutgoingRequest {request} {refreshData} />
        {:else}
          <p class="w-full text-center">No outgoing requests.</p>
				{/each}
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
