<script lang="ts">
	import { chatMessages, chatFriendUserId, chatUserID } from '$lib/stores';
</script>

{#each $chatMessages as message}
	{#if message.sender_id === $chatUserID}
		<div
			class="right-0 ml-auto mr-0 flex w-fit max-w-[80%] items-center rounded-xl rounded-br-sm bg-sky-600 px-3 py-2"
		>
			<p class="max-w-full break-words">
				{message.message}
			</p>
		</div>
	{:else if message.sender_id.toLocaleLowerCase() === 'server'}
		<div class="left-0 flex w-full items-center rounded-xl bg-slate-600 px-3 py-2">
			<p class="max-w-full break-words">{message.message}</p>
		</div>
	{:else}
		<div
			class="left-0 flex w-fit max-w-[80%] items-center rounded-xl rounded-bl-sm bg-slate-600 px-3 py-2"
		>
			<p class="max-w-full break-words">{message.message}</p>
		</div>
	{/if}
{:else}
	<p class="m-2">
		Start your conversation with {$chatFriendUserId || ''}!
	</p>
{/each}

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>
