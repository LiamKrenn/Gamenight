import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas';
import { fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { AUTH_URL } from '$env/static/private';

export const load = (async () => {
	return {
		emailForm: await superValidate(zod(loginSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async (event) => {
   
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let response = await fetch(AUTH_URL + '/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier: form.data.email,
				password: form.data.password,
				two_factor_code: 0
			})
		});

		let json = await response.json();

		if (response.status !== 200) {
      console.log(json);
      
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

		return redirect(300, "/")
	} 
};
