<script>
    export let items = ['A', 'B', 'C'];
</script>

<ul>
    {#each items as item}
        <li class="fancy">
            <slot prop={item} />
        </li>
    {/each}
</ul>
