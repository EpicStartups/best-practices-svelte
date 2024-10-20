import type { PageServerLoad } from './$types';
import type { DataModule } from './utils.svelte';

export const load: PageServerLoad = (event): DataModule => {
	return {
		name: event.locals.name,
		hobbies: [
			{
				name: 'swimming'
			}
		]
	};
};
