import { PRIVATE_AUTH_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    let userResp = await fetch(PRIVATE_AUTH_URL + '/profile/profile/' + event.params.username);  
    console.log(userResp);
    let user = await userResp.json();
    console.log(user);
    
    return {
      user: user
    };
}) satisfies PageServerLoad;