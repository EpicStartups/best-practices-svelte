import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';
import {
	getMessages,
	insertMessage,
	deleteMessage,
	updateMessage
} from '$lib/server/db/messages/message';
import { handleFunc } from '$lib/utils';
import { redirect, fail } from '@sveltejs/kit';
import { validateMessage } from './validation';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();

	// get messages from db
	const [messages, error] = await handleFunc(getMessages());
	if (error) {
		console.log('THERE WAS AN ERROR');
	}

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

		// If not signed in, redirect to sign in page
		if (!session?.user?.id) {
			redirect(302, '/sign-in');
		}

		// Validate input
		const validation = validateMessage(textInput);
		if (!validation.isValid) {
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
	},

	delete: async function ({ request }: { request: Request }) {
		const data = await request.formData();
		const id = data.get('id');
		console.log('DELETING ');

		// Check for session
		const session = await auth.api.getSession({
			headers: request.headers
		});

		// If not signed in, redirect to sign in page
		if (!session?.user?.id) {
			redirect(302, '/sign-in');
		}

		// Proceed with deletion.. only access the error
		const { 1: error } = await handleFunc(deleteMessage(id));

		if (error) {
			fail(400, { error: error.message });
		}

		return { success: true };
	},

	update: async function ({ request }: { request: Request }) {
		const data = await request.formData();
		const id = data.get('id');
		const text = data.get('text');

		// Check for session
		const session = await auth.api.getSession({
			headers: request.headers
		});

		// If not signed in, redirect to sign in page
		if (!session?.user?.id) {
			redirect(302, '/sign-in');
		}

		// validate id and text
		if (!id || !text) {
			fail(400, { error: 'id and text are required' });
		}

		// Proceed with update.. only access the error
		const { 1: error } = await handleFunc(
			updateMessage({ id: id, text: text, user_id: session.user.id })
		);
		if (error) {
			fail(400, { error: error.message });
		}

		// validate
		return { success: true };
	}
};
