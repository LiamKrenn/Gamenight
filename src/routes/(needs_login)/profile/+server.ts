import { authorizedFetch } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	let resp = await authorizedFetch(event, '/profile');
	let json = await resp.json();

	let returnJson = null;

	if (json?.detail === 'Unauthorized') {
		event.cookies.delete('session', { path: '/' });
		returnJson = null;
	} else {
		returnJson = json;
	}

	if (returnJson == null) {
		return new Response(null, { status: 401 });
	}
	return new Response(JSON.stringify(returnJson), { status: 200 });
};

export const POST: RequestHandler = async (event) => {
	const formData = await event.request.formData();
	return await authorizedFetch(event, '/profile/picture', formData, {}, 'POST');
};
