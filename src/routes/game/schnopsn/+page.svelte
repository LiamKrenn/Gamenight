<script lang="ts">
    import Schnopsn from '$lib/games/schnopsn/Schnopsn.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="w-full h-full relative ">
  <Schnopsn />
</div>
