import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signupConfirmSchema, signupSchema } from '$lib/schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import { PRIVATE_AUTH_URL } from '$env/static/private';

export const load = (async () => {
	return {
		form: await superValidate(zod(signupSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	signup: async (event) => {
		const form = await superValidate(event, zod(signupSchema));
		if (!form.valid) {
			return fail(400, {
				form,
				error: 'Invalid form'
			});
		}

		let response = await fetch(AUTH_URL + '/signup', {
			method: 'POST',
			headers: {
        'User-Agent': event.request.headers.get('User-Agent') || '',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: form.data.email,
				password: form.data.password,
				username: form.data.username
			})
		});

		console.log(response.status);

		if (response.status !== 200 && response.status !== 204) {
			let json = await response.json();
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

		return redirect(300, '/signup/confirm/' + form.data.email);
	}
};
