export async function load({ request }) {
	const query = new URL(request.url).searchParams;
	const color = query.get('color');
	return { a: 1, color };
}
