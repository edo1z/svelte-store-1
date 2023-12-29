<!-- Modal.svelte -->
<script>
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let isCsr = false;

	onMount(() => {
		isCsr = true;
	});

	onDestroy(() => {});

	function close() {
		dispatch('close');
	}
</script>

<div class="modal">
	<div class="modal-content">
		<span class="close-button" on:click={close}>&times;</span>
	</div>
</div>

<style>
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		background-color: #fefefe;
		margin: auto;
		padding: 20px;
		border: 1px solid #888;
		width: 80%;
		min-width: 500px;
		min-height: 500px;
	}

	.close-button {
		color: #aaaaaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close-button:hover,
	.close-button:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
</style>
