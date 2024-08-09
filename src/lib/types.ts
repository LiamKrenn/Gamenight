export type User = {
  createdAt: string,
  email: string,
  username: string
}

export type Request = {
  request_id: string,
  receiver: User,
  sender: User
}
