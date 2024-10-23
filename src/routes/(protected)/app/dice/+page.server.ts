import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		throw redirect(302, '/sign-in');
	}

	return {
		user: session.user
	};
};
