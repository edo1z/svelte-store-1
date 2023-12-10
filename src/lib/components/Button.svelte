<button class="my-button">
  <slot></slot>
</button>

<style>
	.my-button {
		background-color: var(--button-bg-color, blue);
		color: var(--button-text-color, white);
	}
</style>
