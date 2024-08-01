import { AUTH_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function GET(req) {
	let jj = await fetch(AUTH_URL + `/oauth/google/callback${req.url.search}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			cookie: `session=${req.cookies.get('session')}`
		}
	});

	let json = await jj.json();

	req.cookies.set('session', json.session_token, {
		path: '/',
		expires: new Date(new Date().getTime() + json.expires * 1000)
	});

	return redirect(302, '/');
}
