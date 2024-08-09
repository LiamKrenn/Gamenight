import { authorizedFetch } from '$lib/server/utils';
import type { Request } from '$lib/types';
import type { PageServerLoad } from './$types';



export const load = (async (event) => {
	let friendRequestResponse = await authorizedFetch(event, '/ext/friends/requests');
	let friendRequests: {
    outgoing: Request[] | undefined,
    ingoing: Request[] | undefined
  } = await friendRequestResponse.json();

	return {
		outgoing: friendRequests.outgoing,
    incoming: friendRequests.ingoing
	};
}) satisfies PageServerLoad;
