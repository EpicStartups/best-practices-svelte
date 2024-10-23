import { handleFunc } from '$lib/utils';
import { deleteDiceEntry, getDiceEntries, insertDiceEntry } from '$lib/server/db/dice/dice';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }: { url: URL }) {
	// Get user_id from the URL query parameters
	const userId = url.searchParams.get('user_id');

	// Validate userId
	if (!userId) {
		throw error(400, 'user_id is required');
	}

	// Fetch dice entries
	const [entries, err] = await handleFunc(getDiceEntries(userId));
	if (err) {
		console.error('Error fetching dice entries:', err);
		throw error(500, 'Internal Server Error');
	}

	// Return the entries as JSON
	return json(entries);
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

export async function DELETE({ url }: { url: URL }) {
	// Get user_id from the URL query parameters
	const diceId = url.searchParams.get('dice_id');

	// Validate userId
	if (!diceId) {
		throw error(400, 'dice_id is required');
	}

	// Delete dice entry
	const { 1: err } = await handleFunc(deleteDiceEntry(diceId));
	if (err) {
		console.error('Error deleting dice entry:', err);
		throw error(500, 'Internal Server Error');
	}

	// Return success
	return json({ success: true });
}
