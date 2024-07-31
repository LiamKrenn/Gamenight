import { AUTH_URL } from '$env/static/private';

export async function GET(req) {  
  let jj = await fetch(AUTH_URL + `/oauth/google/callback${req.url.search}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'cookie': `session=${req.cookies.get('session')}`
    }
  })
	console.log(jj);
  
  let session = '1234567890';
	let resp = new Response(null, {
		status: 302,
		headers: { Location: '/', 'Set-Cookie': `session=${session}` }
	});

	return resp;
}
