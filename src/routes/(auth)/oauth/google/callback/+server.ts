import { AUTH_URL } from '$env/static/private';

export async function GET(req) {
	let jj = await fetch(AUTH_URL + `/oauth/google/callback${req.url.search}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			cookie: `session=${req.cookies.get('session')}`
		}
	});

	let json = await jj.json();
	let resp = new Response(null, {
		status: 302
	});

	req.cookies.set('session', json.session_token, {
		path: '/',
		expires: new Date(new Date().getTime() + json.expires * 1000)
	});

	return resp;
}
