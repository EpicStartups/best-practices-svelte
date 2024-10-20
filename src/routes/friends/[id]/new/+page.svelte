<script lang="ts">
	import { setContext } from 'svelte';
	import { InitData } from './utils.svelte.js';
	import DummyComponent from './DummyComponent.svelte';

	let { data } = $props();
	const dataModule = new InitData(data);
	setContext('testData', dataModule.values);
</script>

<h1>Hello</h1>
{JSON.stringify(dataModule.values)}

<DummyComponent />

<button onclick={() => dataModule.updateName('test1000')}>Update Name</button>
