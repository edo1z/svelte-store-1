<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Uppy from '@uppy/core';
	import Cropper from 'cropperjs';
	import ThumbnailGenerator from '@uppy/thumbnail-generator';
	import 'cropperjs/dist/cropper.css';

	let isCsr = false;
	let uppy: Uppy = new Uppy().use(ThumbnailGenerator, { thumbnailWidth: 500 });
	let cropper: Cropper | undefined;
	let previewSrc: string;
	let imageUrl: string = '';
	let imageElem: HTMLImageElement;
	let zoomValue = 1;

	async function handleDrop(event: DragEvent) {
		const file = event.dataTransfer?.files[0];
		if (file) {
			uppy.addFile({
				name: file.name,
				type: file.type,
				data: file
			});
		}
	}

	const initCropper = () => {
		console.log('initCropper');
		if (cropper) {
			cropper.destroy();
		}
		cropper = new Cropper(imageElem, {
			aspectRatio: 1,
			dragMode: 'move',
			cropBoxResizable: false,
			cropBoxMovable: false,
			zoomable: true,
			minCropBoxWidth: 200,
			minCropBoxHeight: 200,
			zoom: function (event) {
				zoomValue = event.detail.ratio * 100;
			}
		});
	};

	const onCropHandler = () => {
		console.log('onCropHandler');
		cropper?.getCroppedCanvas().toBlob((blob) => {
			if (!blob) return;
			uppy.getFiles().forEach((file) => {
				uppy.removeFile(file.id);
			});
			uppy.addFile({
				name: 'cropped',
				type: 'image/jpeg',
				data: blob
			});
		});
	};

	const onRotationRightHandler = () => {
		console.log('onRotationRightHandler');
		cropper?.rotate(90);
	};

	const onRotationLeftHandler = () => {
		console.log('onRotationLeftHandler');
		cropper?.rotate(-90);
	};

	const onZoomChange = (e: any) => {
		cropper?.zoomTo(zoomValue / 100);
	};

	onMount(() => {
		isCsr = true;
	});

	onDestroy(() => {
		uppy.close();
	});

	uppy.on('files-added', (files) => {
		console.log('added files', files, uppy.getState());
	});

	uppy.on('thumbnail:generated', (file, preview) => {
		previewSrc = preview;
		imageUrl = URL.createObjectURL(file.data);
	});
</script>

<h2>Image Crop</h2>

{#if isCsr}
	<div
		id="drop-target"
		role="button"
		tabindex="0"
		style={previewSrc ? `background-image: url(${previewSrc})` : ''}
		on:drop|preventDefault={handleDrop}
		on:dragover|preventDefault
	></div>

	{#if imageUrl}
		<div id="modal">
			<img src={imageUrl} alt="user profile" bind:this={imageElem} on:load={initCropper} />
			<button on:click={onCropHandler}>crop</button>
			<button on:click={onRotationRightHandler}>Right</button>
			<button on:click={onRotationLeftHandler}>Left</button>
			<input type="range" bind:value={zoomValue} min="30" max="300" on:input={onZoomChange} />
		</div>
	{/if}
{/if}

<style>
	#drop-target {
		margin: 30px;
		background: #333;
		border-radius: 50%;
		width: 200px;
		height: 200px;
		background-size: cover;
		background-position: center;
	}

	#modal {
		width: 500px;
		height: 500px;
	}
	#modal img {
		max-width: 400px;
		max-height: 400px;
	}
</style>
