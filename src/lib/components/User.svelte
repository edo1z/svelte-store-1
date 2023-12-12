<script lang="ts">
  import {getContext} from 'svelte';
  const user = getContext('user');
</script>

<div>USERNAME: {$user}</div>