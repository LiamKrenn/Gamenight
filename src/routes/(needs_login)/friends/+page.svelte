<script lang="ts">
	import FriendItem from './FriendItem.svelte';

	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { List } from 'lucide-svelte';
	import { friends } from '$lib/stores';
	import { getFriendsFromRequests } from '$lib/friends';

	export let data: PageData;

	async function refreshData() {
		let resp = await fetch('/friends');
		data = await resp.json();
		$friends = getFriendsFromRequests(data.friends);
	}

	$friends = getFriendsFromRequests(data.friends);
</script>

<div class="flex h-full w-full items-start justify-center py-8">
	<div class="flex w-96 max-w-[90%] flex-col items-center">
		<div class="mb-4 flex w-full items-center justify-evenly px-4 xs:justify-between">
			<a href="/friends/requests">
				<Button
					variant="ghost"
					class="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-slate-700 p-2 hover:bg-slate-700 "
				>
					<List class="h-8 w-8" />
				</Button>
			</a>
			<h1 class="mx-4 text-center text-4xl font-semibold">Friends</h1>
			<Button
				variant="ghost"
				class="invisible hidden h-14 w-14 items-center justify-center rounded-lg border-2 border-slate-700 p-2 hover:bg-slate-700 xs:flex"
			/>
		</div>

		{#each data.friends || [] as friend}
			<FriendItem {friend} user={data.user} {refreshData} />
		{:else}
			<p>No friends yet. <a class="underline" href="/friends/requests">Add some!</a></p>
		{/each}
	</div>
</div>
