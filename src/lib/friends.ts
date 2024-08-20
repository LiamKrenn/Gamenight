import { get, writable, type Writable } from 'svelte/store';
import { friends, user } from './stores';
import type { Request, User } from './types';

export function getFriendsFromRequests(requests: Request[]): User[] {
	let friends: User[] = [];
	for (let request of requests) {
		let realFriend =
			request != null && (request.receiver.username === get(user)?.username || '')
				? request.sender
				: request.receiver;
		friends = [...friends, realFriend];
	}
	return friends;
}

export async function fetchFriends(): Promise<User[] | null> {
	let friendRequests = await fetch('/friends').then((res) => res.json());
	friends.set(getFriendsFromRequests(friendRequests));
	return get(friends);
}
