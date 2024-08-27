import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { goto, invalidateAll } from '$app/navigation';
import { PRIVATE_AUTH_URL } from '$env/static/private';
import { authorizedFetch } from '$lib/server/utils';
import { user } from '$lib/stores';

export const load = (async (event) => {
	await authorizedFetch(event, '/logout');
	event.cookies.set('session', '', { path: '/' });
	return redirect(302, '/');
}) satisfies PageServerLoad;
