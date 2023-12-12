<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick, beforeUpdate, onMount, afterUpdate, onDestroy } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

	beforeUpdate(async () => {
		console.log('Hoge beforeUpdate');
		await tick();
		console.log('Hoge beforeUpdate after tick');
	});

	onMount(async () => {
		console.log('Hoge mounted');
		await tick();
		console.log('Hoge mounted after tick');
	});

	afterUpdate(async () => {
		console.log('Hoge afterUpdate');
		await tick();
		console.log('Hoge afterUpdate after tick');
	});

	onDestroy(async () => {
		console.log('Hoge destroyed');
		await tick();
		console.log('Hoge destroyed after tick');
	});
</script>

<h1>Hoge</h1>

<p>this is hoge page. thank you.</p>

<div class="canvas-wrapper">
	<div>
		<div>hoge</div>
		<div>
			<button on:click={() => goto('/')}>go back home</button>
			<button on:click={() => goto('/apple')}>go to apple</button>
			<button on:click={() => goto('/banana')}>go to banana</button>
		</div>
	</div>
</div>
<Icon />

<style>
	.canvas-wrapper {
		backdrop-filter: blur(10px);
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 100px;
		font-weight: bold;
	}
</style>
