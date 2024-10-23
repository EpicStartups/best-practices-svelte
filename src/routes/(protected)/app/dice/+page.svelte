<script lang="ts">
	import { handleFunc, formatTimeAgo } from '$lib/utils';
	import { Trash2 } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { Dice } from './dice.svelte';
	import type { DiceEntry } from '$lib/server/db/schema/app-schema';
	let { data } = $props();
	let userId = $state(data.session?.user?.id || '');
	const dice = new Dice(userId);

	let diceEntries: DiceEntry[] = $derived(dice.history);

	onMount(async () => {
		const { 1: error } = await handleFunc(dice.loadEntries());
		if (error) {
			console.log('ERROR: ', error);
		}
	});

	$inspect('DICE ENTRIES: ', diceEntries);
</script>

<div class="flex h-screen">
	<!-- Sidebar -->
	<aside class="hidden w-96 overflow-y-auto border-r border-gray-200 xl:block">
		<div class="px-4 py-6 sm:px-6 lg:px-8">
			{#each diceEntries as entry}
				<Card.Root class="mb-4 w-full">
					<Card.Header class="mb-8">
						<Card.Title>
							<div class="flex flex-row items-center justify-between">
								<p>
									You rolled: <span>{entry.value}</span>
								</p>
								<Button variant="ghost" size="icon" onclick={() => dice.deleteEntry(entry.id)}>
									<Trash2 class="size-4" />
								</Button>
							</div>
						</Card.Title>
						<Card.Description>{formatTimeAgo(new Date(entry.createdAt))}</Card.Description>
					</Card.Header>
				</Card.Root>
			{/each}
		</div>
	</aside>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto">
		<div class="flex h-full items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
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
			</div>
		</div>
	</main>
</div>
