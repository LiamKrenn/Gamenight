import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from "sveltekit-superforms/adapters";
import { signupConfirmSchema, signupSchema } from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';
import { AUTH_URL } from '$env/static/private';

export const load = (async () => {
    return {
      form: await superValidate(zod(signupSchema)),
      confirmForm: await superValidate(zod(signupConfirmSchema))
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
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: form.data.email,
        password: form.data.password,
        username: form.data.username
			})
		});


    console.log(response.status);
    
		if (response.status === 409) {
      console.log('Email already in use');
			return {
				form,
				error: 'Email already in use'
			};
		}
		return { form, success: true }
	},
  signupConfirm: async (event) => {
    const form = await superValidate(event, zod(signupSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let response = await fetch(AUTH_URL + '/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: form.data.email,
        password: form.data.password,
        username: form.data.username
			})
		});

		let json = await response.json();

		if (response.status !== 204 && response.status !== 200) {
			return {
				form,
				error: json.detail
			};
		}

		console.log(json, response.status);
		event.cookies.set('token', json.session_token, {
			path: '/',
			expires: new Date(new Date().getTime() + json.expires * 1000)
		});

		return { form, success: true}
  }
};

