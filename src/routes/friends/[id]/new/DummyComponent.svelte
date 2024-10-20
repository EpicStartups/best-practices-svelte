<script lang="ts">
	import { getContext } from 'svelte';
	let testData = getContext('testData');
</script>

<h1>Dummy Component</h1>
{JSON.stringify(testData)}
