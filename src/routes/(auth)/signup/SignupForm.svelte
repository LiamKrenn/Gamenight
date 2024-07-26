<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { signupSchema, type SignupSchema } from '$lib/schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let signupForm: SuperValidated<Infer<SignupSchema>>;

	const form = superForm(signupForm, {
		validators: zodClient(signupSchema),
		dataType: 'json',
    resetForm: false
	});

	const { form: formData, enhance } = form;

	let passVisible = false;
	let confirmPassVisible = false;
</script>

<form method="POST" action="?/signup" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label class="text-lg ">Username</Form.Label>
			<Input
				class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
				{...attrs}
				bind:value={$formData.username}
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors class="!mb-2" />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label class="text-lg ">Email</Form.Label>
			<Input
				class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
				{...attrs}
				bind:value={$formData.email}
			/>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors class="!mb-2" />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label class="text-lg ">Password</Form.Label>
			<div class="relative">
				{#if passVisible}
					<Input
						class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
						{...attrs}
						bind:value={$formData.password}
					/>
				{:else}
					<Input
						class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
						type="password"
						{...attrs}
						bind:value={$formData.password}
					/>
				{/if}
				<Button
					class="focusring absolute right-0 top-0 h-10 w-10 rounded-lg p-2 hover:bg-slate-700/50"
					variant="ghost"
					on:click={() => {
						passVisible = !passVisible;
					}}
				>
					{#if passVisible}
						<EyeOff />
					{:else}
						<Eye />
					{/if}
				</Button>
			</div>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors class="!mb-2" />
	</Form.Field>
	<Form.Field {form} name="confirmPassword">
		<Form.Control let:attrs>
			<Form.Label class="text-lg ">Confirm Password</Form.Label>
			<div class="relative">
				{#if confirmPassVisible}
					<Input
						class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
						{...attrs}
						bind:value={$formData.confirmPassword}
					/>
				{:else}
					<Input
						class="focusring !mt-1 rounded-lg bg-slate-800 text-base"
						type="password"
						{...attrs}
						bind:value={$formData.confirmPassword}
					/>
				{/if}
				<Button
					class="focusring absolute right-0 top-0 h-10 w-10 rounded-lg p-2 hover:bg-slate-700/50"
					variant="ghost"
					on:click={() => {
						confirmPassVisible = !confirmPassVisible;
					}}
				>
					{#if confirmPassVisible}
						<EyeOff />
					{:else}
						<Eye />
					{/if}
				</Button>
			</div>
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors class="!mb-2" />
	</Form.Field>
  {#if $page.form?.error}
     <p class="text-red-400">{$page.form?.error}</p>
  {/if}
	<Form.Button class="focusring mt-2 w-full">Sign Up</Form.Button>
</form>

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>
