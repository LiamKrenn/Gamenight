<script lang="ts">
	import { User, LogIn, LogOut, UserPlus } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	export let user;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		><User
			class="m-2 h-12 w-12 rounded-lg p-2 duration-150 hover:cursor-pointer hover:bg-slate-700"
		/></DropdownMenu.Trigger
	>
	<DropdownMenu.Content class="rounded-lg border-slate-700 bg-slate-800">
		<DropdownMenu.Group>
      {#if !user}
			  <DropdownMenu.Label>My Account</DropdownMenu.Label>
      {:else}
			  <DropdownMenu.Label >{user.username}</DropdownMenu.Label>
      {/if}
			<DropdownMenu.Separator class="bg-slate-700" />
			<a href="/profile">
				<DropdownMenu.Item class="rounded-lg bg-slate-800 duration-150 hover:!bg-slate-700"
					><User class="mr-2" /> Profile</DropdownMenu.Item
				>
			</a>
			{#if !user}
				<a href="/login">
					<DropdownMenu.Item class="rounded-lg bg-slate-800 duration-150 hover:!bg-slate-700"
						><LogIn class="mr-2" /> Log In</DropdownMenu.Item
					>
				</a>
				<a href="/signup">
					<DropdownMenu.Item class="rounded-lg bg-slate-800 duration-150 hover:!bg-slate-700"
						><UserPlus class="mr-2" /> Create an Account</DropdownMenu.Item
					>
				</a>
			{:else}
				<a href="/logout" data-sveltekit-preload-data="false" data-sveltekit-preload-code="false" data-sveltekit-reload>
					<DropdownMenu.Item class="rounded-lg bg-slate-800 duration-150 hover:!bg-slate-700"
						><LogOut class="mr-2" />Logout</DropdownMenu.Item
					>
				</a>
			{/if}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<style>
	:global(.cshadow) {
		box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.25);
	}
</style>
