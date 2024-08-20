<script lang="ts">
	import SignupForm from './SignupForm.svelte';

	import type { ActionData, PageData } from './$types';
	import GithubMark from '$lib/icons/github-mark.svelte';
	import GoogleG from '$lib/icons/Google_G.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ezauthURL } from '$lib';

	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="w-[80%] max-w-96 rounded-lg bg-slate-700 p-4 ring-2 ring-slate-600">
		<h1 class="mb-4 w-full text-center text-4xl font-bold">Sign Up</h1>
		<a href="{ezauthURL}/oauth/google/login">
			<Button class="mb-2 w-full">
				<GoogleG class="mr-2" /> Google
			</Button>
		</a>

		<a href="{ezauthURL}/oauth/github/login">
			<Button class="mb-1 w-full">
				<GithubMark class="mr-2 h-6 w-6" /> Github
			</Button>
		</a>
		<div class="my-2 flex w-full items-center">
			<div class="h-0.5 w-full rounded-full bg-slate-500" />
			<p class="mx-2 text-[0.7rem] text-slate-300">OR</p>
			<div class="h-0.5 w-full rounded-full bg-slate-500" />
		</div>
		<SignupForm signupForm={data.form} />
	</div>
	<div class="mt-2 flex w-[80%] max-w-96 items-center justify-center">
		<a href="/login" class="underline">Already have an account?</a>
	</div>
</div>
