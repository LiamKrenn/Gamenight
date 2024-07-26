<script lang="ts">
  import SignupForm from './SignupForm.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="w-[80%] max-w-96 rounded-lg bg-slate-700 p-4 ring-2 ring-slate-600">
		<h1 class="mb-4 w-full text-center text-4xl font-bold">Sign Up</h1>
    <SignupForm signupForm={data.form}/>
	</div>
	<div class="mt-2 flex w-[80%] max-w-96 items-center justify-center">
		<a href="/login" class="underline">Already have an account?</a>
	</div>
</div>

