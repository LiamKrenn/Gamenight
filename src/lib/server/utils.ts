import { PUBLIC_AUTH_URL } from '$env/static/public';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';

export let authorizedFetch = async (
	event: RequestEvent | ServerLoadEvent,
	route: string,
  body: any = null,
  headers: any = {},
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET'
) => {
  headers.cookie = `session=${event.cookies.get('session')}`;
	return await event.fetch(PUBLIC_AUTH_URL + route, {
		method: method,
		credentials: 'include',
    body: body,
		headers: headers
	});
};
