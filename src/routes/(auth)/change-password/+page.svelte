<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import ForgotPassForm from './ForgotPassForm.svelte';

	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="w-[80%] max-w-96 rounded-lg bg-slate-700 p-4 ring-2 ring-slate-600">
		<h1 class="mb-4 w-full text-center text-4xl font-bold">
			{#if data.changePassword}
				Change
			{:else}
				Forgot
			{/if} Password
		</h1>
		<ForgotPassForm forgotForm={data.form} lockEmail={data.changePassword} />
	</div>
</div>
