<script lang="ts">
	import HorizontalScrollButtons from '$lib/components/HorizontalScrollButtons.svelte';
	import { Dices, Percent, Users } from 'lucide-svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-start py-8">
	<div class="h-full w-[90vh] max-w-[95%] mobile:max-w-[90%]">
		<div class="mb-4 flex w-full items-center justify-between">
			<h2 class="flex items-center text-xl font-semibold mobile:text-3xl">
				<Dices class="mr-3 ml-2 shrink-0 mobile:h-8 mobile:w-8" /> Games
			</h2>
			<HorizontalScrollButtons />
		</div>
		<div class="mb-6 flex h-[240px] w-full space-x-4 overflow-hidden">
			<!-- Games -->
			<a href="/game/schnopsn" class="shrink-0 h-[240px] w-[160px]">
				<img src="/gamecards/Schnopsn.png" alt="Schnopsn" class="shrink-0" />
			</a>
			<img class="shrink-0" src="/gamecards/Schach.png" alt="Schach" />
			<img class="shrink-0" src="/gamecards/UNO.png" alt="UNO" />
			<img class="shrink-0" src="/gamecards/SchiffeVersenken.png" alt="Schiffe Versenken" />
			<img class="shrink-0" src="/gamecards/maedn.png" alt="Mensch ärgere dich nicht" />
			<img class="shrink-0" src="/gamecards/SchlangenULeitern.png" alt="Schlangen & Leitern" />
		</div>
		<div class="mb-4 flex w-full items-center justify-between">
			<h2 class="flex items-center text-xl font-semibold mobile:text-3xl">
				<Percent class="mr-3 ml-2 shrink-0 mobile:h-8 mobile:w-8" /> Shop Offers
			</h2>
			<HorizontalScrollButtons />
		</div>
		<div class="mb-6 flex h-[240px] w-full space-x-4 overflow-hidden">
			<!-- Shop Offers -->
			<div class="shrink-0">
        <img src="/Shop.png" alt="Shop Offers" class="">
      </div>
		</div>
		<div class="mb-4 flex w-full items-center justify-between">
			<h2 class="flex items-center text-xl font-semibold mobile:text-3xl">
				<Users class="mr-3 ml-2 shrink-0 mobile:h-8 mobile:w-8" /> Public Parties
			</h2>
			<HorizontalScrollButtons />
		</div>
		<div class="mb-6 flex h-[128px] w-full space-x-4 overflow-hidden">
			<!-- Public Parties -->
       <div class="shrink-0">
         <img src="/Partys.png" alt="Public Parties" class="">
       </div>
      </div>
	</div>
</div>

<style>
	:global(.gray-filter) {
		filter: grayscale(1);
	}
</style>
