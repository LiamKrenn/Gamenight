<script lang="ts">
	import Maedn from '$lib/components/gameCards/maedn.svelte';
import Schach from '$lib/components/gameCards/schach.svelte';
	import SchiffeVersenken from '$lib/components/gameCards/schiffeVersenken.svelte';
import Schnopsn from '$lib/components/gameCards/schnopsn.svelte';
	import Sul from '$lib/components/gameCards/sul.svelte';
	import Uno from '$lib/components/gameCards/uno.svelte';
import HorizontalScrollButtons from '$lib/components/HorizontalScrollButtons.svelte';
	import { Dices, Percent, Users } from 'lucide-svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-start py-8">
	<div class="h-full w-[90vh] max-w-[95%] mobile:max-w-[90%]">
    <div class="w-full flex justify-between items-center mb-4">
      <h2 class="flex items-center mobile:text-3xl text-xl font-semibold"><Dices class="mr-3 mobile:h-8 mobile:w-8 shrink-0" /> Games</h2>
      <HorizontalScrollButtons/>
    </div>
    <div class="flex h-[240px] w-full space-x-4 mb-6 overflow-hidden">
      <!-- Games -->
       <a href="/game/schnopsn">
        <Schnopsn class="hover:-translate-y-0.5 cursor-pointer shrink-0" />
      </a>
      <Schach class="grey-filter shrink-0"/>
      <Uno class="grey-filter shrink-0"/>
      <SchiffeVersenken class="grey-filter shrink-0"/>
      <Maedn class="grey-filter shrink-0"/>
      <Sul class="grey-filter shrink-0"/>
    </div>
    <div class="w-full flex justify-between items-center mb-4">
      <h2 class="flex items-center mobile:text-3xl text-xl font-semibold"><Percent class="mr-3 mobile:h-8 mobile:w-8 shrink-0" /> Shop Offers</h2>
      <HorizontalScrollButtons/>
    </div>
    <div class="flex h-[240px] w-full space-x-4 mb-6 overflow-hidden">
      <!-- Shop Offers -->
      Shop Offers
    </div>
    <div class="w-full flex justify-between items-center mb-4">
      <h2 class="flex items-center mobile:text-3xl text-xl font-semibold"><Users class="mr-3 mobile:h-8 mobile:w-8 shrink-0" /> Public Parties</h2>
      <HorizontalScrollButtons/>
    </div>
    <div class="flex h-[240px] w-full space-x-4 mb-6 overflow-hidden">
      <!-- Public Parties -->
      Public Parties
    </div>
	</div>
</div>

<style>
  :global(.grey-filter) {
    filter: grayscale(1);
  }
</style>
