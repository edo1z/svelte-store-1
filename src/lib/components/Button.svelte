<script lang="ts">
	let keys: string[] = [];

	function handleKeydown(event: KeyboardEvent) {
		keys = [...keys, event.key];
		if (keys.length > 10) {
			keys.shift();
		}
	}

	let isHovered = false;
	function handleMouseenter(event: MouseEvent) {
		isHovered = true;
	}

	function handleMouseleave(event: MouseEvent) {
		isHovered = false;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:body on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave} />

<button class="my-button {isHovered ? 'hovered' : ''}"> PUSU ME or MOUSE ENTER ME!!!! </button>

<div id="key-screen">
	{keys.join(' ')}
</div>

<style>
	.my-button {
		background-color: var(--button-bg-color, blue);
		color: var(--button-text-color, white);
	}
	.my-button.hovered {
		background-color: var(--button-hovered-bg-color, black);
		color: var(--button-hovered-text-color, white);
	}

	#key-screen {
		position: fixed;
		top: 0;
		right: 0;
		padding: 10px;
		background-color: #010;
		color: #0f0;
		height: 50px;
		min-width: 200px;
	}
</style>
