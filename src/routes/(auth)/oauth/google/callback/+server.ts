import { AUTH_URL } from '$env/static/private';

export async function GET(req) {  
  let jj = await fetch(AUTH_URL + `/oauth/google/callback${req.url.search}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'cookie': `session=${req.cookies.get('session')}`
    }
  })
	console.log(await jj.json());
  
  let session = '1234567908';
	let resp = new Response(null, {
		status: 302,
		headers: { Location: '/', 'Set-Cookie': `session=${session}` }
	});

  req.cookies.set('session', session, {path: '/'});

	return resp;
}
