import { AUTH_URL } from '$env/static/private';
import { authorizedFetch } from '$lib/server/utils';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { profileSchema } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect, type RequestHandler } from '@sveltejs/kit';

export const load = (async (event) => {
    let response = await authorizedFetch(event, '/profile');
    // TODO: wrong profile error handling
    const profile = await response.json();
    const profileForm = await superValidate(zod(profileSchema))
    profileForm.data.email = profile.email;
    profileForm.data.username = profile.username;
  

    return {
      profile: profile,
      profileForm: profileForm
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

    let response = await authorizedFetch(event,
      '/profile',
      JSON.stringify({
        email: form.data.email,
        username: form.data.username,
      }),
      {
        'Content-Type': 'application/json'
      },
      'PATCH'
    );

		let json = await response.json();

		if (response.status !== 200) {
      console.log(json);
      
			return {
				form,
				error: json.detail
			};
		}

		return redirect(302, '/profile?success=true');
	} 
};
