<script lang="ts">
	import LogoNoBackground from '$lib/icons/logo-no-background.svelte';
	import { ArrowLeft, Dices, ArrowRight } from 'lucide-svelte';
</script>

<div class="flex">
	<div
		class="flex mobile:h-10 h-8 mobile:w-14 w-10 items-center justify-center rounded-l-full border-[1px] border-slate-700"
	>
		<ArrowLeft class="h-6 w-6 stroke-slate-700" />
	</div>
	<div
		class="flex mobile:h-10 h-8 mobile:w-14 w-10 items-center justify-center rounded-r-full border-[1px] border-slate-700"
	>
		<ArrowRight class="h-6 w-6 stroke-slate-700" />
	</div>
</div>
