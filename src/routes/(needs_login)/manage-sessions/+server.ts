import { authorizedFetch } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	let response = await authorizedFetch(event, '/sessions');
	let json = await response.json();
	return new Response(JSON.stringify(json), { status: 200 });
};
