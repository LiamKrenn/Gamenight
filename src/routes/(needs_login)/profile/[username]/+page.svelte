<script lang="ts">
	import { PUBLIC_AUTH_URL } from '$env/static/public';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);
</script>

<div class="p-7">
	<div
		class="flex flex-col justify-center
gap-5 text-white lg:flex-row"
	>
		<div
			class="flex max-w-[700px]
            flex-1 flex-row
            gap-7 rounded-xl bg-gray-700 p-6 shadow-2xl
            "
		>
			{#if data.pic_available}
				<img src="{PUBLIC_AUTH_URL}/cdn/{data.user._id}.webp" alt="Profile" />
			{:else}
				<img src="/favicon.png" alt="Profile" />
			{/if}
			<div>
				<p class="text-4xl font-bold">{data.user.username}</p>
				<p class="mb-2">
					with us since {new Date(data.user.createdAt).toLocaleString('de-DE', {
						year: 'numeric',
						month: 'short',
						day: '2-digit'
					})}
				</p>
				<p class="text-lg">🥇 <span class="text-green-400">1 (100%)</span></p>
				<p class="text-lg">🎮 <span class="text-blue-400">1</span></p>
				<p class="text-lg">❌ <span class="text-red-400">0 (0%)</span></p>
			</div>
		</div>
	</div>
</div>
