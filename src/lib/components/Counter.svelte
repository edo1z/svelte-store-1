<script lang="ts">
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	const count = writable(0);
	const dispatch = createEventDispatcher();

	export const getCount = () => $count;

	const increment = () => {
		count.update((n) => n + 1);
		dispatch('update', { count: $count });
	};
	const decrement = () => {
		count.update((n) => n - 1);
		dispatch('update', { count: $count });
	};
</script>

<div id="display-count">
	{$count}
</div>

<button on:click={increment}>+1</button>
<button on:click={decrement}>-1</button>
