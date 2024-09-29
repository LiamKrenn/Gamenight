import { PRIVATE_AUTH_URL } from '$env/static/private';
import { authorizedFetch } from '$lib/server/utils';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { profileSchema } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_AUTH_URL } from '$env/static/public';

export const load = (async (event) => {
	const profile = event.locals.user;
	if (!profile) {
		return redirect(302, '/login');
	}
	const profileForm = await superValidate(zod(profileSchema));
	profileForm.data = profile;

	// Check if Profile Picture Available
	const pic_available =
		(
			await fetch(`${PUBLIC_AUTH_URL}/cdn/${profile._id}.webp`, {
				method: 'GET'
			})
		).status === 200;

	return {
		profile: profile,
		joinDate: new Date(profile.createdAt).toISOString().slice(0, 10).split('-').reverse().join('/'),
		profileForm: profileForm,
		pic_available: pic_available
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	profile: async (event) => {
		const form = await superValidate(event, zod(profileSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let response = await authorizedFetch(
			event,
			'/profile',
			JSON.stringify({
				email: form.data.email,
				username: form.data.username
			}),
			{
				'Content-Type': 'application/json'
			},
			'PATCH'
		);

		let json = await response.json();

		if (response.status !== 200) {
			console.log(json);
			if (typeof json.detail === 'string') {
				return {
					form,
					error: json.detail
				};
			} else {
				return {
					form,
					error: 'An unexpected error occurred.'
				};
			}
		}

		return redirect(302, '/profile?success=true');
	}
};
