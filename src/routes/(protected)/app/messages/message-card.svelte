<script lang="ts">
	import { formatTimeAgo } from '$lib/utils.js';
	import { Trash2, Pencil } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	type Message = {
		id: string;
		text: string;
		userName: string;
		createdAt: Date;
		canModify: boolean;
	};

	let { id, text, userName, createdAt, canModify }: Message = $props();

	let editable: boolean = $state(false);

	const toggleEditable = () => {
		editable = !editable;
	};
</script>

<div
	class={cn(
		'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
	)}
>
	<div class="flex w-full flex-col gap-1">
		<div class="flex items-center justify-between">
			<div class="text-xs font-medium">{userName}</div>
			<div>
				<div class={cn('ml-auto text-xs text-muted-foreground')}>
					{formatTimeAgo(new Date(createdAt))}
				</div>
			</div>
		</div>
	</div>
	<div class="{editable ? 'hidden' : ''} line-clamp-2 text-xs text-muted-foreground">
		{text}
	</div>
	{#if canModify}
		{#if !editable}
			<!-- Form action from within a component. Can use ?/delete as well but this is more explcit, meaning other routes can use this as well -->
			<div class="flex w-full items-center justify-end">
				<div class="flex flex-row">
					<form method="POST" action="/app/messages?/delete">
						<input type="hidden" name="id" value={id} />
						<Button type="submit" variant="ghost" size="icon">
							<span class="sr-only">Move to trash</span>
							<Trash2 class="size-4" />
						</Button>
					</form>

					<Button onclick={toggleEditable} variant="ghost" size="icon">
						<span class="sr-only">Edit</span>
						<Pencil class="size-4" />
					</Button>
				</div>
			</div>
		{:else}
			<form class="w-full" id="update-message" method="POST" action="/app/messages?/update">
				<input type="hidden" name="id" value={id} />
				<Textarea typeof="text" name="text" placeholder={text} value={text} required />
			</form>
			<div class="flex w-full justify-end gap-2">
				<Button onclick={toggleEditable} variant="outline">Cancel</Button>
				<Button form="update-message" type="submit" variant="default">Save</Button>
			</div>
		{/if}
	{/if}
</div>
