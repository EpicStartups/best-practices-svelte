import type { Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Return the result of the auth handler
	return svelteKitHandler({ event, resolve, auth });
};
