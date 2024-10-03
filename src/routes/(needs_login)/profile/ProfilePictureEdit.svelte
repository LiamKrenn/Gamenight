<script lang="ts">
	import { PUBLIC_AUTH_URL } from '$env/static/public';
	import Cropper from 'svelte-easy-crop';
	import type { PageData } from './$types';
	import getCroppedImg from '$lib/canvasUtils';
	import { FileDrop } from 'svelte-droplet';
	import { ArrowLeft, Edit, Save, Trash2, Upload, RefreshCw, ImagePlay } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import ProfilePicture from '$lib/components/ProfilePicture.svelte';

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

	async function handleGIFFiles(files: File[]) {
		if (files.length != 1) {
			throw new Error('Please upload only one file');
		} else {
			const formData = new FormData();
			formData.append('pic', files[0], 'profile_picture');

			loading = true;
			const response = await fetch('/profile', {
				method: 'POST',
				body: formData
			});

			if (response.status === 200) {
				location.reload();
			} else {
				uploadedFile = null;
				loading = false;
			}
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
				location.reload();
			} else {
				uploadedFile = null;
				loading = false;
			}
		}
	}

	let croppedImage: string;
</script>

<div class="relative flex h-48 w-full flex-col items-center">
	{#if !uploadedFile}
		<div class="flex">
			<div class="relative mt-8">
				<FileDrop let:droppable {handleFiles} acceptedMimes={['image/*']} max={1}>
					<div
						class:droppable
						class=" absolute flex aspect-square h-full flex-col items-center justify-center rounded-xl bg-slate-900/70 outline-dashed outline-2 outline-slate-600"
					>
						<p class="mx-2 text-center">Change profile picture</p>
						<Upload class="mt-2" />
						<div
							class:droppable
							class="absolute -top-12 right-0 flex w-28 justify-center rounded-lg bg-slate-700 p-2"
						>
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
					class="absolute -top-12 left-0 !cursor-not-allowed bg-red-500/60 p-2 hover:bg-red-500/40"
				>
					<Trash2 />
				</Button>
			</div>
			<ProfilePicture
				id={data.profile._id}
				class="mt-8 aspect-square h-40 w-40 min-w-40 shrink-0 rounded-xl bg-slate-400/30"
			/>
		</div>

		<FileDrop let:droppable handleFiles={handleGIFFiles} acceptedMimes={['image/*']} max={1}>
			<div class:droppable class=" flex w-28 justify-center p-1 text-sm">Upload GIF</div>
		</FileDrop>
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
