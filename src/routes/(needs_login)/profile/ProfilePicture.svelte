<script lang="ts">
	import { PUBLIC_AUTH_URL } from '$env/static/public';
	import Cropper from 'svelte-easy-crop';
	import type { PageData } from './$types';
	import getCroppedImg from '$lib/canvasUtils';
	import { FileDrop } from 'svelte-droplet';
	import { ArrowLeft, Edit, Save, Trash2, Upload, RefreshCw } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;

	let uploadedFile: File | null = null;
	const aspect = 1;
	const maxZoom = 10;
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let loading = false;

	function handleFiles(files: File[]) {
		if (files.length != 1) {
			throw new Error('Please upload only one file');
		} else {
			uploadedFile = files[0];
		}
	}

	async function apply() {
		if (croppedImage) {
			const formData = new FormData();
			formData.append('pic', await (await fetch(croppedImage)).blob(), 'profile_picture');

			loading = true;
			const response = await fetch('/profile', {
				method: 'POST',
				body: formData
			});

			if (response.status === 200) {
				data.pic_available = true;
				location.reload();
			} else {
				uploadedFile = null;
				loading = false;
			}
		}
	}

	let croppedImage: string;
</script>

<div class="relative flex h-40 w-full justify-center">
	{#if !uploadedFile}
		{#if data.pic_available}
			<FileDrop let:droppable {handleFiles} acceptedMimes={['image/*']} max={1}>
				<div
					class:droppable
					class=" absolute flex aspect-square h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-900/70"
				>
					<p class="text-center">Change profile picture</p>
					<Upload class="mt-2" />
					<div class:droppable class="absolute -right-12 top-0 rounded-lg bg-slate-700 p-2">
						<Edit />
					</div>
				</div>
			</FileDrop>
			<Button
				on:click={() => {
					// uploadedFile = null;
					// data.pic_available = false;
					// TODO: apply
				}}
				variant="secondary"
				class="absolute left-0 top-0 !cursor-not-allowed bg-red-500/60 p-2 hover:bg-red-500/40"
			>
				<Trash2 />
			</Button>

			<img
				src="{PUBLIC_AUTH_URL}/cdn/{data.profile._id}.webp"
				alt="Profile"
				class="aspect-square h-full rounded-xl bg-slate-600"
			/>
		{:else}
			<FileDrop let:droppable {handleFiles} acceptedMimes={['image/*']} max={1}>
				<div
					class:droppable
					class=" flex aspect-square h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-900"
				>
					<p class="text-center">Upload a profile picture</p>
					<Upload class="mt-2" />
				</div>
			</FileDrop>
		{/if}
	{:else}
		<div class="cropper relative aspect-square h-full !duration-0">
			<Cropper
				image={URL.createObjectURL(uploadedFile)}
				{aspect}
				{maxZoom}
				bind:crop
				bind:zoom
				on:cropcomplete={async (e) => {
					if (uploadedFile) {
						croppedImage = await getCroppedImg(URL.createObjectURL(uploadedFile), e.detail.pixels);
					}
				}}
			/>
			<Button
				on:click={() => {
					apply();
				}}
				variant="secondary"
				class="absolute -right-12 top-0 bg-slate-600 p-2 hover:bg-slate-600/70"
			>
				{#if loading}
					<RefreshCw class="animate-spin" />
				{:else}
					<Save />
				{/if}
			</Button>
			<Button
				on:click={() => {
					uploadedFile = null;
				}}
				variant="secondary"
				class="absolute -right-12 top-12 bg-orange-500/60 p-2 hover:bg-orange-500/40"
			>
				<ArrowLeft />
			</Button>
		</div>
	{/if}
</div>

<style>
	:global(.cropper, .svelte-easy-crop-container, .svelte-easy-crop-area, .svelte-easy-crop-image) {
		animation-duration: 0ms;
		transition-duration: 0ms;
	}
</style>
