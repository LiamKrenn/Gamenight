<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	const tabs: string[][] = [
		['News', 'news'],
		['Leaderboard', 'leaderboard']
	];
</script>

<Tabs.Root value={tabs[0][1]} class="h-min w-full ">
	<Tabs.List class="w-full bg-slate-700">
		{#each tabs as tab}
			<Tabs.Trigger class="w-full data-[state=active]:bg-slate-800" value={tab[1]}>
				{tab[0]}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	<Tabs.Content value="news">
		<slot name="news" />
	</Tabs.Content>
	<Tabs.Content value="leaderboard">
		<slot name="leaderboard" />
	</Tabs.Content>
</Tabs.Root>
