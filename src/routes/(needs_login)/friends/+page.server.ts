import { authorizedFetch } from '$lib/server/utils';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	let friendsResponse = await authorizedFetch(event, '/ext/friends');
	let friends = await friendsResponse.json();
	
  
  
	return {
		friends: friends
	};
}) satisfies PageServerLoad;
