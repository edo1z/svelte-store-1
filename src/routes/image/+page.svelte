<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import Uppy from '@uppy/core';
	import DragDrop from '@uppy/drag-drop';

	import '@uppy/core/dist/style.css';
	import '@uppy/dashboard/dist/style.css';
	import '@uppy/drag-drop/dist/style.min.css';
	import '@uppy/webcam/dist/style.css';

	let uppy: Uppy = new Uppy();

	let container: HTMLElement;
	let isCsr = false;

	onMount(() => {
		isCsr = true;
	});

	$: if (isCsr && container) {
		const existingPlugin = uppy.getPlugin('drag-drop');
		if (existingPlugin) {
      console.log('remove!');
			uppy.removePlugin(existingPlugin);
		}
		uppy.use(DragDrop, { id: 'drag-drop', target: container });
	}

	onDestroy(() => {
		uppy.close();
	});
</script>

<h2>DragDrop</h2>

target-id: {container?.id}

{#if isCsr}
	<div id="drag-drop" class="dragdrop" bind:this={container}></div>
{/if}

<style>
	.dragdrop {
		margin-top: 20px;
		padding: 10px;
		width: 300px;
		height: 300px;
		background: #212121;
		color: white;
	}
</style>
