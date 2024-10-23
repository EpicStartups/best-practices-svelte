import { PUBLIC_URL } from '$env/static/public';
import { createAuthClient } from 'better-auth/svelte';

export const { signIn, signUp, signOut, useSession } = createAuthClient({
	baseURL: PUBLIC_URL
});
