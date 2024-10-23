import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import type { DiceEntry } from '$lib/server/db/schema/app-schema';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
	request,
	fetch
}: {
	request: Request;
	fetch: any;
}) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	const userId = session?.user?.id;

	const response = await fetch(`api/dice?user_id=${userId}`);
	const data: DiceEntry[] = await response.json();

	if (!session) {
		throw redirect(302, '/sign-in');
	}

	return {
		user: session.user,
		diceEntries: data
	};
};
