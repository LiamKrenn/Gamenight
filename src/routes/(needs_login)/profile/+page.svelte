<script lang="ts">
	import type { PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { page } from '$app/stores';
	import { profileSchema } from '$lib/schemas';
	import { Save, CircleUserRound, KeyRound, MonitorCog, Pencil, X } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import ProfilePictureEdit from './ProfilePictureEdit.svelte';

	export let data: PageData;

	console.log(data);

	const form = superForm(data.profileForm, {
		validators: zodClient(profileSchema),
		dataType: 'json',
		resetForm: false
	});

	const { form: formData, enhance } = form;

	let edit = false;

	$: if ($page.url.search === '?success=true') {
		edit = false;
		goto('/profile');
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<h1 class="my-6 text-5xl font-semibold">Profile</h1>

	<div class="mt-2 w-[90%] max-w-64">
		<ProfilePictureEdit {data} />

		<p class="mt-4 text-lg font-semibold">Email</p>
		<Input
			class="focusring !mt-1 rounded-lg bg-slate-900 text-base"
			inert
			bind:value={data.profile.email}
		/>
		<p class="mt-2 text-lg font-semibold">Username</p>
		{#if edit}
			<form class="mt-1 w-full max-w-64" method="POST" action="?/profile" use:enhance>
				<Form.Field {form} name="username">
					<Form.Control let:attrs>
						<div class="flex flex-col xs:flex-row">
							<Input
								class="focusring rounded-lg bg-slate-700 text-base"
								{...attrs}
								bind:value={$formData.username}
							/>
							<Button
								on:click={() => {
									$formData = data.profile;
									edit = false;
								}}
								variant="secondary"
								class="focusring relative mt-1.5 w-full bg-slate-700 px-2 hover:bg-slate-700/70 xs:ml-2 xs:mt-0 xs:w-min"
								><X class="absolute right-2 xs:static" />
								<p class="flex xs:hidden">Cancel</p></Button
							>
						</div>
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors class="!mb-2" />
				</Form.Field>
				{#if $page.form?.error}
					<p class="font-semibold text-red-400">{$page.form.error}</p>
				{/if}
				<div class="flex w-full flex-wrap-reverse xs:flex-nowrap xs:space-x-2">
					<Form.Button class="focusring relative w-full"
						>Save <Save class="absolute right-2" /></Form.Button
					>
				</div>
			</form>
		{:else}
			<div class="mt-1 flex">
				<Input
					class="focusring  rounded-lg bg-slate-900 text-base"
					inert
					bind:value={data.profile.username}
				/>
				<Button
					on:click={() => (edit = true)}
					variant="secondary"
					class="relative ml-2 w-min text-wrap bg-slate-700 px-2 hover:bg-slate-700/70"
				>
					<Pencil class="" /></Button
				>
			</div>
		{/if}

		<p class="mt-2 text-lg font-semibold">Join Date</p>
		<Input
			class="focusring !mt-1 rounded-lg bg-slate-900 text-base"
			inert
			bind:value={data.joinDate}
		/>
		<a href="/profile/{data.profile.username}">
			<Button
				variant="secondary"
				class="focusring relative mt-4 h-fit w-full text-wrap bg-sky-700 px-12 py-2.5 hover:bg-sky-800"
				><CircleUserRound class="absolute right-4" /> View Public Profile</Button
			>
		</a>
		<a href="/change-password">
			<Button
				variant="secondary"
				class="relative mt-2 w-full text-wrap bg-yellow-500/50 px-12 py-2.5 hover:bg-yellow-500/40"
				>Change Password <KeyRound class="absolute right-4" /></Button
			>
		</a>
		<a href="/manage-sessions">
			<Button
				variant="secondary"
				class="relative mt-2 w-full text-wrap bg-orange-500/50 px-12 py-2.5 hover:bg-orange-600/50"
				>Manage Sessions <MonitorCog class="absolute right-4" /></Button
			>
		</a>
	</div>
</div>

<style>
	:global(.focusring:focus) {
		@apply outline-sky-400;
	}
</style>
