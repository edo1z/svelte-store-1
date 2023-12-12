<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';
  import User from '$lib/components/User.svelte';

	const user = writable('');
  user.set(generateRandomString(5))
	setContext('user', user);

	function generateRandomString(length: number = 5): string {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}
</script>

<div>Banana</div>

<h3>user: {$user}</h3>

<div>
	<form method="post">
		<input name="hoge" type="text" />
		<button type="submit">submit</button>
	</form>
</div>

<div style:margin-top="20px">
	<a href="/">got home</a>
</div>

<User />
