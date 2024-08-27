import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { forgotPasswordSchema, signupConfirmSchema, signupSchema } from '$lib/schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import { PRIVATE_AUTH_URL } from '$env/static/private';

export const load = (async ({ locals }) => {
	let forgotPassForm = await superValidate(zod(forgotPasswordSchema));
	forgotPassForm.data.email = locals.user?.email || '';
	return {
		form: forgotPassForm,
		changePassword: locals.user?.email ? true : false
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	forgotPass: async (event) => {
		const form = await superValidate(event, zod(forgotPasswordSchema));
		if (!form.valid) {
			return fail(400, {
				form,
				error: 'Invalid form'
			});
		}

		let response = await fetch(AUTH_URL + '/forgot-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier: form.data.email,
				password: form.data.new_password
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

		return redirect(300, '/change-password/confirm/' + form.data.email);
	}
};
