import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
  // mentioned here: https://github.com/sveltejs/kit/issues/6315#issuecomment-1363284611
	url.href; // Trigger rerun on URL change -> otherwise load will not run always
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	return {};
}) satisfies LayoutServerLoad;
