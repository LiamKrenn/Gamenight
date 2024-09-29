<script lang="ts">
	import { PUBLIC_AUTH_URL } from '$env/static/public';
	import { Gamepad2, Trophy, X, ArrowLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;

	console.log(data);
</script>

<div class="flex h-full w-full justify-center px-2 !pt-4 2xs:px-4 xs:p-8">
	<div class="flex h-fit max-w-[95%] flex-col">
		<Button
			on:click={() => {
				history.back();
			}}
			variant="secondary"
			class=" mb-4   bg-slate-700 hover:bg-slate-700/70 "
		>
			<ArrowLeft /> Back
		</Button>
		<div
			class="flex h-fit flex-col rounded-xl bg-slate-700 p-3 pb-2 xs:p-4 mobile:h-52 mobile:flex-row"
		>
			{#if data.pic_available}
				<img
					src="{PUBLIC_AUTH_URL}/cdn/{data.user._id}.webp"
					alt="Profile"
					class="aspect-square rounded-lg bg-slate-600"
				/>
			{:else}
				<img
					src="/favicon.png"
					alt="Profile"
					height="100%"
					class="aspect-square rounded-lg bg-slate-600 p-2"
				/>
			{/if}
			<div class="mt-2 flex flex-col mobile:mx-4 mobile:mt-0">
				<h1 class="text-xl font-bold 2xs:text-2xl xs:text-3xl mobile:text-4xl">
					{data.user.username}
				</h1>
				<p class="opacity-75">
					<span class="mr-1 hidden 2xs:inline-block">joined</span>{data.user.createdAt.slice(0, 10)}
				</p>
				<div class="flex h-full flex-col justify-center">
					<p class="my-0.5 flex items-center text-lg font-semibold text-sky-400">
						<Gamepad2 class="mr-2" />10
					</p>
					<p class="my-0.5 flex items-center text-lg font-semibold text-green-400">
						<Trophy class="mr-2" />7
					</p>
					<p class="my-0.5 flex items-center text-lg font-semibold text-red-400">
						<X class="mr-2" /> 3
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
