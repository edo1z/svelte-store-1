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

<Icon />

<button on:click={() => goto('/')}>go back home</button>
