<script lang="ts">
	export let news: {
		title: string;
		content: string;
		date: string;
	};
</script>

<div class="my-4 h-full w-full rounded-lg bg-slate-700 sm:px-4 sm:py-3 px-3 py-2">
	<div class="flex items-center justify-between">
		<h1 class="logo:text-xl text-lg font-semibold">{news.title}</h1>
		<p class="whitespace-nowrap text-slate-400">{news.date}</p>
	</div>
	<p class="logo:mt-2 mt-0 text-slate-300">{@html news.content}</p>
</div>
