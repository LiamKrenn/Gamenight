<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    console.log(data);
</script>

<div class="flex h-full w-full items-start justify-center py-8">
  <div class="w-96 flex flex-col items-center">
    <h1 class="text-4xl font-semibold">Friends</h1>


  </div>
	
</div>
