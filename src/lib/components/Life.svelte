<script lang="ts">
	import { beforeUpdate, onMount, afterUpdate, onDestroy } from 'svelte';
	import { getContext } from 'svelte';
	import FancyList from './FancyList.svelte';

	onMount(() => {
		console.log('Life mounted');
	});

	beforeUpdate(() => {
		console.log('Life beforeUpdate');
	});

	afterUpdate(() => {
		console.log('Life afterUpdate');
	});

	onDestroy(() => {
		console.log('Life destroyed');
	});
	let items: string[] = getContext('items') || [];
</script>

<div>Life</div>

<FancyList {items} let:prop={thing}>
	<div>[Life]: {thing}</div>
</FancyList>
