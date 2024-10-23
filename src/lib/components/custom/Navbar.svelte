<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { handleFunc } from '$lib/utils';
	import { signOut } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	type Route = {
		path: string;
		label: string;
	};

	let { routes }: { routes: Route[] } = $props();

	async function handleLogout() {
		const { 1: error } = await handleFunc(signOut());
		if (error) {
			alert(error.message);
		} else {
			goto('/sign-in');
		}
	}
</script>

<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<div class="flex w-full flex-row justify-between">
		<nav
			class="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			{#each routes as route}
				<a href={route.path} class="text-muted-foreground transition-colors hover:text-foreground">
					{route.label}
				</a>
			{/each}
		</nav>
		<Button onclick={handleLogout}>Sign out</Button>
	</div>
</header>
