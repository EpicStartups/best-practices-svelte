<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import MessageCard from './message-card.svelte';

	let { data } = $props();

	let messages = $state(data.messages);
</script>

<div class="p-10">
	<div class="space-y-1">
		<h4 class="text-sm font-medium leading-none">This page uses form actions</h4>
		<p class="text-sm text-muted-foreground">Forms used to trigger db actions</p>
	</div>
	<Separator class="my-4" />
	<!-- Main 3 column grid -->
	<div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
		<!-- Left column -->
		<div class="grid grid-cols-1 gap-4 lg:col-span-2">
			<section aria-labelledby="section-1-title">
				<h2 class="sr-only" id="section-1-title">Section title</h2>
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<ScrollArea>
						<div class="flex flex-col gap-2 pt-0">
							{#if messages && messages.length > 0}
								{#each messages as { message, userName }}
									<MessageCard
										id={message.id}
										text={message.text}
										createdAt={message.createdAt}
										{userName}
									/>
								{/each}
							{/if}
						</div>
					</ScrollArea>
				</div>
			</section>
		</div>

		<!-- Right column -->
		<div class="grid grid-cols-1 gap-4">
			<section aria-labelledby="section-2-title">
				<h2 class="sr-only" id="section-2-title">Section title</h2>
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-6">
						<form id="insert-message" method="POST" action="?/insert">
							<Input type="text" name="text" placeholder="Message" required />
						</form>

						<!-- Button outside form can still be used to trigger form action. usinging the form attribute  -->
						<Button type="submit" form="insert-message" class="mt-4">Add Message</Button>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
