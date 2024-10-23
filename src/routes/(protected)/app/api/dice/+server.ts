import { handleFunc } from '$lib/utils';
import { getDiceEntries, insertDiceEntry } from '$lib/server/db/dice/dice';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }: { url: URL }) {
	// Get user_id from the URL query parameters
	const userId = url.searchParams.get('user_id');

	// Validate userId
	if (!userId) {
		throw error(400, 'user_id is required');
	}

	try {
		// Fetch dice entries
		const entries = await getDiceEntries(userId);

		// Return the entries as JSON
		return json(entries);
	} catch (err) {
		console.error('Error fetching dice entries:', err);
		throw error(500, 'Internal Server Error');
	}
}

export async function POST({ request, url }: { request: Request; url: URL }) {
	const userId = url.searchParams.get('user_id');

	if (!userId) {
		throw error(400, 'user_id is required');
	}

	const { value } = await request.json();

	if (typeof value !== 'number') {
		throw error(400, 'value must be a number');
	}

	const [data, err] = await handleFunc(insertDiceEntry({ user_id: userId, value }));
	if (err) {
		console.error('Error inserting dice entry:', err);
		throw error(500, 'Internal Server Error');
	}

	return json(data);
}
