import { authorizedFetch } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async (event) => {
	let response = await authorizedFetch(event, `/sessions/${event.params.id}`, {}, {}, 'DELETE');
	console.log(response.status);

	if (response.status !== 204) {
		return new Response('Failed to delete session', { status: 500 });
	}
	return new Response('Session deleted', { status: 200 });
};
