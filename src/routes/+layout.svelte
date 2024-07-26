<script lang="ts">
	import Navlogo from '$lib/icons/nav/navlogo.svelte';
	import Navtext from '$lib/icons/nav/navtext.svelte';
	import { AlignJustify, Bell, MessageCircle, User } from 'lucide-svelte';
  import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import Navitems from '$lib/components/navitems.svelte';
	import { page } from '$app/stores';

  const routes: string[][] = [
    ['Games', '/games'],
    ['Shop', '/shop'],
    ['Friends', '/friends'],
  ]
</script>

<title>Gamenight</title>

<div class="h-full w-full flex flex-col">
  <div class="w-full flex items-center justify-between h-16 cshadow">
    <div class="flex items-center">
      <AlignJustify class="w-12 h-12 p-2 m-2 mr-0 hover:bg-slate-700 rounded-lg duration-150 hover:cursor-pointer"/>
      <a href="/" class="flex ml-1 items-center hover:bg-slate-700 p-2 rounded-lg hover:cursor-pointer duration-150">
        <Navlogo />
        <Navtext class="ml-2"/>
      </a>
      <Navitems id={$page.route.id} {routes}/>
    </div>
    <div class="flex items-center">
      <MessageCircle class="w-12 h-12 p-2 m-2"/>
      <Bell class="w-12 h-12 p-2 "/>
      <User class="w-12 h-12 p-2 m-2"/>
    </div>
  </div>
  <slot/>
</div>

<style>
  :global(.cshadow) {
    box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>
