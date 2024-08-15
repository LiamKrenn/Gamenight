import { get } from "svelte/store";
import { user } from "./stores";
import type { Request, User } from "./types";

export function getFriendsFromRequests(requests: Request[]): User[] {
  let friends: User[] = []
  for (let request of requests) {
    let realFriend = request != null && (request.receiver.username === get(user)?.username || "") ? request.sender : request.receiver;
    friends = [...friends, realFriend];
  }
  return friends;
}