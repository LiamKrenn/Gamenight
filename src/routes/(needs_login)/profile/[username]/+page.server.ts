import { PUBLIC_AUTH_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    let userResp = await fetch(PUBLIC_AUTH_URL + '/profile/profile/' + event.params.username);  
    console.log(userResp);
    let user = await userResp.json();
    console.log(user);
    
    return {
      user: user
    };
}) satisfies PageServerLoad;