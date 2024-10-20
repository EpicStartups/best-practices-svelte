import { type Handle } from '@sveltejs/kit';
export const handle: Handle = ({ event, resolve }) => {
	event.locals.name = 'test name';
	return resolve(event);
};
