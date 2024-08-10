<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
  <h1 class="text-4xl font-semibold mb-8 text-center">{$page.status}: {$page.error?.message}</h1>
  <img class="w-[52rem] max-w-[80%]" src="error.gif" alt="Error GIF"/>
  <p class="text-2xl mt-8 text-center">Go back to the <a href="/" class="underline">homepage</a></p>
</div>