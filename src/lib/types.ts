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

export type CardType = {
  skin: "default",
  color: "hearts" | "diamonds" | "clubs" | "spades" | undefined,
  value: 2 | 3 | 4 | 10 | 11 | undefined
}
