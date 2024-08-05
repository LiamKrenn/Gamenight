import { authorizedFetch } from '$lib/server/utils';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	let response = await authorizedFetch(event, '/sessions');
	let json = await response.json();
	return {
		sessions: json.sessions
	};
}) satisfies PageServerLoad;
