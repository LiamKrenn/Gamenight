<script lang="ts">
	import { PUBLIC_AUTH_URL } from '$env/static/public';

	export let id: string;
	let className = '';
	export { className as class };
</script>

<img src="{PUBLIC_AUTH_URL}/cdn/{id}.webp" alt="profile" class="{className} bg-slate-400/30" />
