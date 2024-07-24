export const socketMessageAddKey = (channelId: string) =>
  `channel:${channelId}:messages`

export const socketMessageUpdateKey = (channelId: string, messageId: string) =>
  `channel:${channelId}:message:${messageId}`
