import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { goto, invalidateAll } from '$app/navigation';
import { AUTH_URL } from '$env/static/private';

export const load = (async ({ cookies }) => {
	cookies.set('session', '', { path: '/' });

  await fetch(AUTH_URL + '/logout', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'cookie': `session=${cookies.get('session')}`
    }
  })

	return redirect(302, '/');
  
}) satisfies PageServerLoad;
