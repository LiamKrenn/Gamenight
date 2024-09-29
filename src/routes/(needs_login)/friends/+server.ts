import { authorizedFetch } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	let friendsResponse = await authorizedFetch(event, '/ext/friends');
	let friends: Request[] = await friendsResponse.json();

	return new Response(JSON.stringify(friends), { status: 200 });
};
