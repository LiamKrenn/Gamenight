import { authorizedFetch } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
  let friendRequestResponse = await authorizedFetch(event, '/ext/friends/requests');
	let friendRequests: {
    outgoing: Request[] | undefined,
    ingoing: Request[] | undefined
  } = await friendRequestResponse.json();

	return new Response(JSON.stringify(friendRequests), { status: 200 });
}


export const POST: RequestHandler = async (event) => {
	let body = await event.request.json();

	if (body?.action === 'cancel' || body?.action === 'decline' || body?.action === 'remove') {
		let resp = await authorizedFetch(
			event,
			`/ext/friends/remove`,
			JSON.stringify({ request_id: body.request_id }),
			{
				'Content-Type': 'application/json'
			},
			'DELETE'
		);
    if (resp.status === 204) {
      return new Response(null, { status: 204 });
    }
    
	} else if (body?.action === 'accept') {
    let resp = await authorizedFetch(
      event,
      `/ext/friends/accept`,
      JSON.stringify({ request_id: body.request_id }),
      {
        'Content-Type': 'application/json'
      },
      'POST'
    );
    if (resp.status === 204) {
      return new Response(null, { status: 204 });
    }
  } else if (body?.action === 'send') {
    let resp = await authorizedFetch(
      event,
      "/ext/friends/add",
      JSON.stringify({ identifier: body.username }),
      {
        'Content-Type': 'application/json'
      },
      'POST'
    );
    console.log(resp);
    console.log(await resp.json());
    console.log(body.username)
    
    if (resp.status === 200) {
      return new Response(null, { status: 200 });
    }
  }
	return new Response(null, { status: 400 });
};
