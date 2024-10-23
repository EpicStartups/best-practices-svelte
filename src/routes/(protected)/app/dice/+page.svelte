<script lang="ts">
	import { handleFunc } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { Dice } from './dice.svelte';
	import type { DiceEntry } from '$lib/server/db/schema/app-schema';
	let { data } = $props();
	let userId = $state(data.session?.user?.id || '');
	const dice = new Dice(userId);

	let diceEntries: DiceEntry[] = $derived([]);

	onMount(async () => {
		const { 1: error } = await handleFunc(dice.loadEntries());
		if (error) {
			console.log('ERROR: ', error);
		}
	});

	$inspect('DICE ENTRIES: ', diceEntries);
</script>

<div class="flex h-screen w-full items-center justify-center">
	<div class="text-center">
		<h1 class="mb-8 text-balance text-8xl font-bold tracking-tight text-gray-800">
			{dice.value}
		</h1>
		<Button
			class="px-8 py-3 text-xl font-semibold transition-all duration-300 hover:scale-105"
			onclick={() => dice.roll()}
		>
			Roll
		</Button>
		{#each diceEntries as entry}
			<p>{entry.value}</p>
		{/each}
	</div>
</div>
