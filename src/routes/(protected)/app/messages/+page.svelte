<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import MessageCard from './message-card.svelte';
	import { LoaderCircle } from 'lucide-svelte';
	import type { Message } from '$lib/server/db/schema/app-schema';
	import { useSession } from '$lib/auth-client';

	let { data } = $props();

	let messages = $state(data.messages || []);
	const session = useSession();

	let user = $derived($session.data?.user);

	let formLoading: boolean = $state(false);
</script>

<div class="p-10">
	<div class="space-y-1">
		<h4 class="text-sm font-medium leading-none">This page uses form actions</h4>
		<p class="text-sm text-muted-foreground">
			Data state is managed via forms, any declared states are just for rendering.
		</p>
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
									{@const canModify = userName == user?.name}
									<MessageCard
										id={message.id}
										text={message.text}
										createdAt={message.createdAt}
										{userName}
										{canModify}
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
						<form
							id="insert-message"
							method="POST"
							action="?/insert"
							use:enhance={() => {
								// use enhance to do selective rendering
								formLoading = true;
								return async ({ result }) => {
									// add a delay
									setTimeout(() => {
										if (result.type === 'success') {
											const messageData: Message = result.data?.message;
											const userName: string = result.data?.userName;

											console.log('RESULT DATA: ', result.data);

											// append to the beginning of the array
											messages.unshift({
												message: {
													id: messageData.id,
													text: messageData.text,
													createdAt: messageData.createdAt,
													updatedAt: messageData.updatedAt
												},
												userName: userName
											});
										}

										formLoading = false;
									}, 500); // 0.5 second delay so it's not too fast.
								};
							}}
						>
							<Input type="text" name="text" placeholder="Message" required />
						</form>

						<!-- Button outside form can still be used to trigger form action. usinging the form attribute  -->
						<Button type="submit" form="insert-message" class="mt-4" disabled={formLoading}>
							{#if formLoading}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Add Message</Button
						>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
