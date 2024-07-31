export async function GET(req) {
	console.log(req);
  
  let token = '1234567890';
	let resp = new Response(null, {
		status: 302,
		headers: { Location: '/', 'Set-Cookie': `token=${token}`, 'access-control-expose-headers': 'Set-Cookie' }
	});

	return resp;
}
