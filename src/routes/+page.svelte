<script lang="ts">
	import Hoge from '$lib/components/Hoge.svelte';
	import Counter from '$lib/components/Counter.svelte';
	import Transition from '$lib/components/Transition.svelte';
	import Button from '$lib/components/Button.svelte';
	import FancyList from '$lib/components/FancyList.svelte';
	const calc = (n: number) => n * 3;

	let counter1: any;
	let counter2: any;
	let totalCount = 0;
	const updateTotalCount = (arg: any) => {
		console.log(arg.detail.count);
		totalCount = counter1.getCount() + counter2.getCount();
	};

	let items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
</script>

<div>TOTAL: {totalCount}</div>
<div>
	<Counter bind:this={counter1} on:update={updateTotalCount} />
</div>

<div>
	<Counter bind:this={counter2} on:update={updateTotalCount} />
</div>

<div>
	Hello, <Hoge {calc} class="hoge" />
</div>

<div style:margin-top="20px">
	<Transition />
</div>

<Button --button-bg-color="#090" --button-text-color="#fff">Button</Button>

<FancyList {items} let:prop={thing}>
	<div>[Fancy]: {thing}</div>
</FancyList>
