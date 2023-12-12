export async function load({ data, parent }) {
	let { a, b } = await parent();
	console.log('data', data, a, b);
	a = a ?? 5;
	b = b ?? 6;
	const component =
		data.color === 'green'
			? await import('$lib/components/GreenApple.svelte')
			: await import('$lib/components/BlueApple.svelte');
	console.log('component', component);
	return { a, b, c: 7, component: component.default };
}
