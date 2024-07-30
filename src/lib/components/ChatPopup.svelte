<script lang="ts">
	import { Minus, UserPlus, X, ChevronRight } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { openChat } from '$lib/stores';
	import Sidebar from './Sidebar.svelte';

	export let friends = ['Jonas', 'Johan', 'Johanna', 'Johannes'];
</script>

<div
	class="absolute bottom-4 right-4 hidden h-[500px] w-[400px] flex-col rounded-lg bg-slate-700 mobile:flex {$openChat
		? 'opacity-100'
		: 'opacity-0'}"
>
	<div class="cshadow flex h-14 w-full shrink-0 items-center justify-between pl-4 pr-2">
		<!-- Header -->
		<h2 class="text-2xl font-semibold">Chats</h2>
		<div class="flex">
			<!-- TODO: implement -->
			<UserPlus class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-600" />
			<button on:click={() => ($openChat = false)}>
				<Minus class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-600" />
			</button>
		</div>
	</div>
	<div class="flex h-full">
		<div class="h-full w-32 shrink-0 space-y-2 border-r-[1px] border-slate-600 p-2">
			{#each friends as friend}
				<Button
					variant="outline"
					class="w-full border-slate-600 bg-slate-700 text-slate-100 hover:bg-slate-600"
					>{friend}</Button
				>
			{/each}
		</div>
		<div class="h-full w-full">
			<!-- Chat -->
		</div>
	</div>
</div>
<Sidebar class="absolute left-0 top-0 flex mobile:hidden" open={$openChat}>
	<div class="h-full w-full p-4">
		<div class=" flex w-full shrink-0 items-center justify-between pl-2">
			<!-- Header -->
			<h2 class="text-2xl font-semibold">Chats</h2>
			<div class="flex">
				<!-- TODO: implement -->
				<UserPlus class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-700" />
				<button on:click={() => ($openChat = false)}>
					<X class="h-10 w-10 cursor-pointer rounded-lg p-2 hover:bg-slate-700" />
				</button>
			</div>
		</div>
		<div class="mt-4 space-y-2">
			{#each friends as friend}
				<Button
					variant="outline"
					class="h-12 w-full justify-start rounded-lg border-slate-700 bg-slate-800 py-0 pl-2 pr-0 text-slate-100 hover:bg-slate-700"
				>
					<p class="w-32">{friend}</p>
					<p class="w-full overflow-hidden overflow-ellipsis text-left text-slate-500">
						Last message bla bla bla bla bla bla bla bla
					</p>
					<ChevronRight class="h-10 w-10 shrink-0 rounded-lg stroke-slate-300 p-2" />
				</Button>
			{/each}
		</div>
	</div>
</Sidebar>
