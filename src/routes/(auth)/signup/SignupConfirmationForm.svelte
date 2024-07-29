<script lang="ts">
	import type { PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { signupConfirmSchema, type SignupConfirmSchema } from '$lib/schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let signupConfirmForm: SuperValidated<Infer<SignupConfirmSchema>>;
  export let email: string;

	const form = superForm(signupConfirmForm, {
		validators: zodClient(signupConfirmSchema),
		dataType: 'json',
    resetForm: false
	});

	const { form: formData, enhance } = form;

  $formData.email = email
</script>

<form method="POST" action="?/signupConfirm" use:enhance>
	<Form.Field {form} name="email" >
		<Form.Control let:attrs>
			<Form.Label class="text-lg ">Email</Form.Label>
			<Input
        disabled={true}
				class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
				{...attrs}
				bind:value={$formData.email}
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors class="!mb-2" />
	</Form.Field>
  <Form.Field {form} name="code">
		<Form.Control let:attrs>
			<Form.Label class="text-lg ">Confirmation Code</Form.Label>
			<Input
				class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
				{...attrs}
				bind:value={$formData.code}
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors class="!mb-2" />
	</Form.Field>
  {#if $page.form?.error}
     <p class="text-red-400">{$page.form?.error}</p>
  {/if}
	<Form.Button class="focusring mt-2 w-full">Confirm</Form.Button>
</form>

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>
