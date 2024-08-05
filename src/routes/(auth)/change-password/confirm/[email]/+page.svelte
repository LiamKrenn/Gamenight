<script lang="ts">
	import ForgotPassConfirmationForm from '../../ForgotPassConfirmationForm.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="w-[80%] max-w-96 rounded-lg bg-slate-700 p-4 ring-2 ring-slate-600">
		<h1 class="mb-4 w-full text-center text-4xl font-bold">
			{#if data.changePassword}
				Change
			{:else}
				Forgot
			{/if} Password Confirm
		</h1>
		<ForgotPassConfirmationForm forgotPassConfirmForm={data.confirmForm} email={data.email} />
	</div>
</div>
