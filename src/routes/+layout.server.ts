import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, url }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session && url.pathname.startsWith('/app')) {
		throw redirect(302, '/sign-in');
	}

	return {
		session: session
	};
};
