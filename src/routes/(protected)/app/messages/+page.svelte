<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { formatTimeAgo } from '$lib/utils.js';
	import { cn } from '$lib/utils.js';

	let { data } = $props();

	let messages = $state(data.messages);
</script>

<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
	<h1 class="sr-only">Page title</h1>
	<!-- Main 3 column grid -->
	<div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
		<!-- Left column -->
		<div class="grid grid-cols-1 gap-4 lg:col-span-2">
			<section aria-labelledby="section-1-title">
				<h2 class="sr-only" id="section-1-title">Section title</h2>
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-6">
						<ScrollArea>
							<div class="flex flex-col gap-2 p-4 pt-0">
								{#if messages && messages.length > 0}
									{#each messages as { message, userName }}
										<button
											class={cn(
												'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
											)}
											onclick={() => console.log('Hii')}
										>
											<div class="flex w-full flex-col gap-1">
												<div class="flex items-center">
													<div class="flex items-center gap-2">
														<div class="font-semibold">{message.user_id}</div>
													</div>
													<div class={cn('ml-auto text-xs text-muted-foreground')}>
														{formatTimeAgo(new Date(message.createdAt))}
													</div>
												</div>
												<div class="text-xs font-medium">{userName}</div>
											</div>
											<div class="line-clamp-2 text-xs text-muted-foreground">{message.text}</div>
										</button>
									{/each}
								{/if}
							</div>
						</ScrollArea>
					</div>
				</div>
			</section>
		</div>

		<!-- Right column -->
		<div class="grid grid-cols-1 gap-4">
			<section aria-labelledby="section-2-title">
				<h2 class="sr-only" id="section-2-title">Section title</h2>
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-6">
						<form method="POST" action="?/insert">
							<input type="text" name="text" placeholder="Message" required />
							<button type="submit">Add Message</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
