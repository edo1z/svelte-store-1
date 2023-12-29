<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Uppy from '@uppy/core';
	import DropTarget from '@uppy/drop-target';
	import ThumbnailGenerator from '@uppy/thumbnail-generator';
	import Modal from '$lib/components/Modal.svelte';

	let isCsr = false;
	let showModal = false; // Add a flag for showing the modal
	let uppy: Uppy = new Uppy({
		restrictions: {
			maxNumberOfFiles: 1
		},
		onBeforeFileAdded: (currentFile, files) => {
			console.log('onBeforeFileAdded!!!', files);
			return true;
		}
	}).use(ThumbnailGenerator, {
		id: 'thumbnail-generator',
		thumbnailWidth: 500
	});
	let dropTargetElem: HTMLElement;
	let fileInputElem: HTMLElement;
	let previewSrc: string;
	let fileToEdit; // Add a variable to hold the file to be edited

	onMount(() => {
		isCsr = true;
	});

	const initDropTarget = () => {
		console.log('init');
		const dropTarget = uppy.getPlugin('drop-target');
		if (dropTarget) {
			uppy.removePlugin(dropTarget);
		}
		uppy.use(DropTarget, { id: 'drop-target', target: dropTargetElem });
	};

	const onClickHandler = () => {
		console.log('onClick');
		fileInputElem.click();
	};

	const onKeydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onClickHandler();
		}
	};

	const onChangeHandler = (e: any) => {
		const files = Array.from(e.target.files);
		if (files.length <= 0) return;
		const file = files[0];
		try {
			uppy.addFile({
				source: 'file input',
				name: file.name,
				type: file.type,
				data: file
			});
		} catch (err) {
			console.error(err);
		}
	};

	$: if (isCsr && (dropTargetElem || fileInputElem)) {
		console.log('kiteru');
		initDropTarget();
	}

	uppy.on('restriction-failed', (file, error) => {
		console.log('それはだめだぜえ', error);
	});

	uppy.on('file-added', (file) => {
		console.log('ファイルが追加されました:', file);
		fileToEdit = file; // Set the file to be edited
		showModal = true; // Show the modal when a file is added
	});

	uppy.on('file-editor:start', (file) => {
		console.log('file-editor:start', file);
	});

	uppy.on('thumbnail:generated', (file, preview) => {
		console.log('file', file);
		console.log('preview', preview);
		previewSrc = preview;
	});

	uppy.on('file-removed', () => {
		fileInputElem.value = null;
	});

	uppy.on('complete', () => {
		fileInputElem.value = null;
	});

	onDestroy(() => {
		uppy.close();
	});
</script>

<!-- Add the modal to the markup -->
{#if showModal}
	<Modal {uppy} on:close={() => (showModal = false)} />
{/if}

<h2>DragDrop</h2>

hoge isCsr:{isCsr}<br />
drop: {dropTargetElem}<br />
file: {fileInputElem}<br />

{#if isCsr}
	hoge2
	<div
		id="drop-target"
		class="dragdrop"
		bind:this={dropTargetElem}
		style={previewSrc ? `background-image: url(${previewSrc})` : ''}
		on:click={onClickHandler}
		on:keydown={onKeydownHandler}
		role="button"
		tabindex="0"
	></div>
	<input type="file" style="display: none;" bind:this={fileInputElem} on:change={onChangeHandler} />
{/if}
hoge3

<style>
	.dragdrop {
		margin-top: 20px;
		padding: 10px;
		width: 300px;
		height: 300px;
		background: #212121;
		color: white;
	}
	#drop-target {
		border-radius: 50%;
		overflow: hidden;
		width: 300px;
		height: 300px;
		background-size: cover;
		background-position: center;
	}
</style>
