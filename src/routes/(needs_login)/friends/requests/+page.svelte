<script lang="ts">
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	import type { PageData } from './$types';
	import CustomTabs from '$lib/components/CustomTabs.svelte';

	export let data: PageData;

	console.log(data);

	let value = 'incoming';
</script>

<div class="flex h-full w-full items-start justify-center py-8">
  <div class="w-96 flex flex-col items-center">
    <h1 class="text-4xl font-semibold">Friend Request</h1>

    <Tabs.Root {value} class="h-min w-full ">
      <Tabs.List class="w-full bg-slate-700 mt-6">
        <Tabs.Trigger class="w-full data-[state=active]:bg-slate-800" value={'incoming'}>
          Incoming
        </Tabs.Trigger>
        <Tabs.Trigger class="w-full data-[state=active]:bg-slate-800" value={'outgoing'}>
          Outgoing
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="incoming">
        <!-- INCOMING -->
        Incoming
      </Tabs.Content>
      <Tabs.Content value="outgoing">
        <!-- OUTGOING -->
        Outgoing
      </Tabs.Content>
    </Tabs.Root>
  </div>
	
</div>
