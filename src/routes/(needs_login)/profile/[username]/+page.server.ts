import { PRIVATE_AUTH_URL } from '$env/static/private';
import { PUBLIC_AUTH_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	let userResp = await fetch(PRIVATE_AUTH_URL + '/profile/' + event.params.username);
	console.log(userResp);
	let user = await userResp.json();
	console.log(user);

	const yourProfile = event.locals.user;
	const yourFriends = await (await event.fetch('/friends')).json();
	console.log('asdf', yourFriends);

	return {
		user: user,
		personalData: {
			yourProfile: yourProfile?._id === user._id
			// yourFriend: (await (await event.fetch('/friends')).json()).find
		}
	};
}) satisfies PageServerLoad;
