<script>
	import { flip } from 'svelte/animate';
	let items = ['A', 'B', 'C'];

	function shuffle() {
		items = items.sort(() => Math.random() - 0.5);
	}
</script>

<button on:click={shuffle}>Shuffle</button>

<ul>
	{#each items as item, index (item)}
		<li animate:flip>{item}</li>
	{/each}
</ul>
