<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	let num = 0;
	function handleChange(e: any) {
		progress.set(Number(e.target.value));
	}
</script>

TWEEN!!
<progress value={$progress} max="100" style:width="100%" /><br />

$progress: <input type="number" min="0" max="100" step="1" on:change={handleChange} />{$progress}
<br />

num: <input type="number" min="0" max="100" step="1" bind:value={num} />{num}<br />
