import { user } from "./stores";

export async function updateUserStore() {
  let resp = await fetch('/profile');
  if (resp.status === 401) {
    user.set(null);
  } else {
    let json = await resp.json();
    user.set(json);
  }
}