<script lang="ts">
	import type { Action, ActionData, PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Eye, EyeOff } from 'lucide-svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { applyAction } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { page } from '$app/stores';

	export let data: PageData;

	const form = superForm(data.emailForm, {
		validators: zodClient(loginSchema),
		dataType: 'json',
    resetForm: false,
	});

	const { form: formData, enhance } = form;

	let passVisible = false;
</script>

<div class="relative flex h-full w-full flex-col items-center justify-center">
	<div class="w-[80%] max-w-96 rounded-lg bg-slate-700 p-4 ring-2 ring-slate-600">
		<h1 class="mb-4 w-full text-center text-4xl font-bold">Log In</h1>
		<form method="POST" action="?/login" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label class="text-lg ">Email / Username</Form.Label>
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
			{#if $page.form?.error}
				<p class="font-semibold text-red-400">{$page.form.error}</p>
			{/if}
			<Form.Button class="focusring mt-2 w-full">Log In</Form.Button>
		</form>
	</div>
	<div
		class="mt-2 flex w-[80%] max-w-96 flex-col-reverse justify-between px-2 text-center md:flex-row"
	>
		<!-- TODO: Reset Password -->
		<a href="/" class="mt-1 underline md:mt-0">Password forgotten?</a>
		<a href="/signup" class="mt-1 underline md:mt-0">Create an account</a>
	</div>
</div>

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>
