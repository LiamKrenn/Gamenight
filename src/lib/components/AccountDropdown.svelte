<script lang="ts">
	import { User, LogIn, LogOut, UserPlus, List, ArrowDownToLine } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	export let user;
	export let isInStandaloneMode;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="relative">
		<slot />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="rounded-lg border-slate-700 bg-slate-800">
		<DropdownMenu.Group>
			{#if !user}
				<DropdownMenu.Label>Account Settings</DropdownMenu.Label>
			{:else}
				<DropdownMenu.Label>{user.username}</DropdownMenu.Label>
			{/if}
			<DropdownMenu.Separator class="bg-slate-700" />
			{#if !user}
				<a href="/login">
					<DropdownMenu.Item class="rounded bg-slate-800 duration-150 hover:!bg-slate-700"
						><LogIn class="mr-2" /> Log In</DropdownMenu.Item
					>
				</a>
				<a href="/signup">
					<DropdownMenu.Item class="rounded-xl bg-slate-800 duration-150 hover:!bg-slate-700"
						><UserPlus class="mr-2" /> Create an Account</DropdownMenu.Item
					>
				</a>
			{:else}
				<a href="/profile">
					<DropdownMenu.Item class="rounded bg-slate-800 duration-150 hover:!bg-slate-700"
						><User class="mr-2" /> Profile</DropdownMenu.Item
					>
				</a>
				<a href="/friends/requests">
					<DropdownMenu.Item class="rounded bg-slate-800 duration-150 hover:!bg-slate-700"
						><List class="mr-2" /> Friend Requests</DropdownMenu.Item
					>
				</a>
				<a
					href="/logout"
					data-sveltekit-preload-data="false"
					data-sveltekit-preload-code="false"
					data-sveltekit-reload
				>
					<DropdownMenu.Item class="rounded bg-slate-800 duration-150 hover:!bg-slate-700"
						><LogOut class="mr-2" />Logout</DropdownMenu.Item
					>
				</a>
				{#if !isInStandaloneMode}
					<DropdownMenu.Separator class="bg-slate-700" />
					<a href="/install">
						<DropdownMenu.Item class="rounded bg-sky-600/80 duration-150 hover:!bg-sky-700/80"
							><ArrowDownToLine class="mr-2" /> Install!</DropdownMenu.Item
						>
					</a>
				{/if}
			{/if}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<style>
	:global(.cshadow) {
		box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
</style>
