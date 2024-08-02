import { AUTH_URL } from '$env/static/private';
import { authorizedFetch } from '$lib/server/utils';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  let resp = await authorizedFetch(event, '/profile');
  let json = await resp.json();


  if (json?.detail === 'Unauthorized') {
    event.locals.user = null;
  } else {
    event.locals.user = json;
  }
  

  const response = await resolve(event);
  // if (response.status === 404) {
  // 	return {
  // 		status: 404,
  // 		headers: {
  // 			'content-type': 'application/json'
  // 		},
  // 		body: JSON.stringify({ message: 'Not found' })
  // 	};
  // }

  return response;
};