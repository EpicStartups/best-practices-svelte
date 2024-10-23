import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';
import { getMessages, insertMessage } from '$lib/server/db/messages/message';
import { handleFunc } from '$lib/utils';
import { redirect, fail } from '@sveltejs/kit';
import { validateMessage } from './validation';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();

	const [messages, error] = await handleFunc(getMessages());
	if (error) {
		console.log('THERE WAS AN ERROR');
	} else {
		console.log('MESSAGES: ', messages);
	}

	// get messages from db
	return {
		messages: messages
	};
};

export const actions = {
	insert: async function ({ request }: { request: Request }) {
		const data = await request.formData();
		const textInput = data.get('text');

		// Check for session
		const session = await auth.api.getSession({
			headers: request.headers
		});

		if (!session?.user?.id) {
			redirect(302, '/sign-in');
		}

		// Validate input
		const validation = validateMessage(textInput);
		if (!validation.isValid) {
			console.log('Bad Request: ', validation.error);
			fail(400, { error: validation.error });
		}

		// At this point, validation.value is guaranteed to be a non-empty string
		const text = validation.value!;

		// Proceed with insertion.. only access the error
		const { 1: error } = await handleFunc(
			insertMessage({
				user_id: session.user.id,
				text: text
			})
		);

		if (error) {
			fail(400, { error: error.message });
		}

		return { success: true };
	}
};
