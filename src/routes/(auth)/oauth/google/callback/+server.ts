import { AUTH_URL } from '$env/static/private';

export async function GET(req) {
  console.log(req.url.search);
  console.log(req.url.searchParams);
  

  let jj = await fetch(AUTH_URL + `/oauth/google/callback?${req.url.search}`, )
	console.log(jj);
  
  let token = '1234567890';
	let resp = new Response(null, {
		status: 302,
		headers: { Location: '/', 'Set-Cookie': `token=${token}` }
	});

	return resp;
}
