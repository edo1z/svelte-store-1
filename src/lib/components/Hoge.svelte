<script lang="ts">
	export let name = 'world';
	export const age = 20;
	export function greet() {
		alert(`Hello ${name}!`);
	}
	export let calc = (n: number) => n * 2;
	let className = 'hoge';
	export { className as class };

	$: console.log('name', name);
	console.log('age', age);

	let x = 0;
	let y = 0;
	const hoge = (n: number) => {
		y = 3 * n;
	};
	$: hoge(x);
	$: console.log('y changed', y);
</script>

<span class={className}>
	<input type="text" bind:value={name} />
	{calc(age)}
	{name}
</span>

<button on:click={() => (x += 1)}>x++</button>

<ul>
	<li>x:{x}</li>
	<li>y:{y}</li>
</ul>
