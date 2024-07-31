import type { LayoutServerLoad } from './$types';

export const load = (async ({locals, url, cookies}) => {
    url.href; // Same as in /(needs_login)/+layout.server.ts
    cookies.get('session'); // Same reason
    return {
      user: locals.user
    };
}) satisfies LayoutServerLoad;