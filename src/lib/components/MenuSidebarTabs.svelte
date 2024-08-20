<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	let value = 'news';
</script>

<Tabs.Root bind:value class="h-min w-full ">
	<Tabs.List class="w-full bg-slate-700">
		<Tabs.Trigger class="w-full data-[state=active]:bg-slate-800 " value="news">News</Tabs.Trigger>
		<Tabs.Trigger class="w-full data-[state=active]:bg-slate-800 " value="leaderboard">
			Leaderboard
		</Tabs.Trigger>
	</Tabs.List>
	{#if value === 'news'}
		<Tabs.Content value="news" class="">
			<div class="h-full w-full">
				<slot name="news" />
			</div>
		</Tabs.Content>
	{:else if (value = 'leaderboard')}
		<Tabs.Content value="leaderboard">
			<div class="h-full w-full">
				<slot name="leaderboard" />
			</div>
		</Tabs.Content>
	{/if}
</Tabs.Root>
