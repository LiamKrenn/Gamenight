import { PRIVATE_AUTH_URL } from '$env/static/private';
import { PUBLIC_AUTH_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	let userResp = await fetch(PRIVATE_AUTH_URL + '/profile/' + event.params.username);
	console.log(userResp);
	let user = await userResp.json();
	console.log(user);

	// Check if Profile Picture Available
	const pic_available =
		(
			await fetch(`${PUBLIC_AUTH_URL}/cdn/${user._id}.webp`, {
				method: 'GET'
			})
		).status === 200;
	console.log(pic_available);

	const yourProfile = event.locals.user;
	const yourFriends = await (await event.fetch('/friends')).json();
	console.log('asdf', yourFriends);

	return {
		user: user,
		pic_available: pic_available,
		personalData: {
			yourProfile: yourProfile?._id === user._id
			// yourFriend: (await (await event.fetch('/friends')).json()).find
		}
	};
}) satisfies PageServerLoad;
