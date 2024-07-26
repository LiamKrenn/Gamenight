import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { goto, invalidateAll } from '$app/navigation';

export const load = (async ({ cookies }) => {
	cookies.set('token', '', { path: '/' });
	return redirect(302, '/');
  
}) satisfies PageServerLoad;
