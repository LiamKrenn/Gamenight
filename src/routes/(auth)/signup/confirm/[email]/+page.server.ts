import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from "sveltekit-superforms/adapters";
import { signupConfirmSchema, signupSchema } from '$lib/schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import { AUTH_URL } from '$env/static/private';

export const load = (async ({params}) => {
    return {
      email: params.email,
      confirmForm: await superValidate(zod(signupConfirmSchema))
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
  signupConfirm: async (event) => {
    const form = await superValidate(event, zod(signupConfirmSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let response = await fetch(AUTH_URL + '/signup/confirm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier: form.data.email,
        code: form.data.code
			})
		});

		let json = await response.json();
    console.log(json, response.status);
    
		if (response.status !== 204 && response.status !== 200) {
			return {
				form,
				error: json.detail
			};
		}

		console.log(json, response.status);
		event.cookies.set('session', json.session_token, {
			path: '/',
			expires: new Date(new Date().getTime() + json.expires * 1000)
		});

		return redirect(300, "/");
  }
};

