import { AUTH_URL } from '$env/static/private';
import { authorizedFetch } from '$lib/server/utils.js';
import { redirect } from '@sveltejs/kit';

export async function GET(req) {
	let jj = await authorizedFetch(req, `/oauth/github/callback${req.url.search}`);
	let json = await jj.json();
	req.cookies.set('session', json.session_token, {
		path: '/',
		expires: new Date(new Date().getTime() + json.expires * 1000)
	});
	return redirect(302, '/');
}
