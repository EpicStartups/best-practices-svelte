import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
	await parent();
	return {
		hobbies: [
			{
				name: 'swimming',
				skillLevel: 10
			}
		],
		name: locals.name
	};
};
