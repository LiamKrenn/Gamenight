<script lang="ts">
  import SignupForm from './SignupForm.svelte';

	import type { ActionData, PageData } from './$types';
	import GithubMark from '$lib/icons/github-mark.svelte';
	import GoogleG from '$lib/icons/Google_G.svelte';
	import { Button } from '$lib/components/ui/button';
	

	export let data: PageData;
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="w-[80%] max-w-96 rounded-lg bg-slate-700 p-4 ring-2 ring-slate-600">
		<h1 class="mb-4 w-full text-center text-4xl font-bold">Sign Up</h1>
    <Button class="w-full mb-2">
      <GoogleG class="mr-2"/> Google
    </Button>
    <Button  class="w-full mb-1">
      <GithubMark class="h-6 w-6 mr-2"/> Github
    </Button>
    <div class="flex w-full items-center my-2">
      <div class="w-full bg-slate-500 h-0.5 rounded-full"/>
      <p class="text-[0.7rem] mx-2 text-slate-300">OR</p>
      <div class="w-full bg-slate-500 h-0.5 rounded-full"/>
    </div>
    <SignupForm signupForm={data.form}/>
	</div>
	<div class="mt-2 flex w-[80%] max-w-96 items-center justify-center">
		<a href="/login" class="underline">Already have an account?</a>
	</div>
</div>

