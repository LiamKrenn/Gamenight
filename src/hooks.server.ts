import { AUTH_URL } from '$env/static/private';
import { authorizedFetch } from '$lib/server/utils';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let resp = await authorizedFetch(event, '/profile');
	let json = await resp.json();

	console.log(json);

	if (json?.detail === 'Unauthorized') {
		event.cookies.delete('session', { path: '/' });
		event.locals.user = null;
	} else {
		event.locals.user = json;
	}

	const response = await resolve(event);
	return response;
};
