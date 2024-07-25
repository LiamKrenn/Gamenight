<script lang="ts">
  import SignupForm from './SignupForm.svelte';

	import type { ActionData, PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { signupSchema, type SignupSchema } from '$lib/schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Eye, EyeOff } from 'lucide-svelte';
	import SignupConfirmationForm from './SignupConfirmationForm.svelte';

	export let data: PageData;
  export let action: ActionData;
  
  
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="w-[80%] max-w-96 rounded-lg bg-slate-700 p-4 ring-2 ring-slate-600">
		<h1 class="mb-4 w-full text-center text-4xl font-bold">Sign Up</h1>
    {#if !action?.success}
		  <SignupForm signupForm={data.form} {action}/>
    {:else}
      <SignupConfirmationForm signupConfirmForm={data.confirmForm} email={action.form.data.email}/>
    {/if}
    
	</div>
	<div class="mt-2 flex w-[80%] max-w-96 items-center justify-center">
		<a href="/login" class="underline">Already have an account?</a>
	</div>
</div>

