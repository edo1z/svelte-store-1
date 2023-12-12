<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	console.log('data!!!', JSON.stringify(data, null, 2));

	const handleClick = () => {
		goto('/');
	};
</script>

Apple Computer

<button on:click={handleClick}>Go to home</button>

<svelte:component this={data.component} />
