import { authorizedFetch } from '$lib/server/utils';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	let friendRequestResponse = await authorizedFetch(event, '/ext/friends/requests');
	let friendRequests = await friendRequestResponse.json();

	return {
		friendRequests: friendRequests
	};
}) satisfies PageServerLoad;
