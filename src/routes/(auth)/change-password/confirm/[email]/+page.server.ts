import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { forgotPasswordConfirmSchema, signupConfirmSchema, signupSchema } from '$lib/schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import { PRIVATE_AUTH_URL } from '$env/static/private';

export const load = (async ({ params, locals }) => {
	return {
		email: params.email,
		changePassword: locals.user?.email ? true : false,
		confirmForm: await superValidate(zod(forgotPasswordConfirmSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	forgotPassConfirm: async (event) => {
		const form = await superValidate(event, zod(forgotPasswordConfirmSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let response = await fetch(AUTH_URL + '/confirm-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier: form.data.email,
				code: form.data.code
			})
		});

		if (response.status !== 204 && response.status !== 200) {
			let json = await response.json();
			console.log(json, response.status);
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

		if (event.locals.user?.email) {
			return redirect(300, '/profile');
		} else {
			return redirect(300, '/login');
		}
	}
};
