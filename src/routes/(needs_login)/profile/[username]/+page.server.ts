import { AUTH_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const username = event.params.username;
    return {};
}) satisfies PageServerLoad;