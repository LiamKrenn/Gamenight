import { authorizedFetch } from '$lib/server/utils';
import type { Request } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	let friendsResponse = await authorizedFetch(event, '/ext/friends');
	let friends: Request[] = await friendsResponse.json();

	return {
		friends: friends
	};
}) satisfies PageServerLoad;
