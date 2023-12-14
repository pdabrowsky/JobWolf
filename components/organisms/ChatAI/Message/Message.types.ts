export type MessageProps = {
  className?: string
  message: MessageType
}

export type MessageType = {
  id: number
  text: string
  sender: 'user' | 'ai'
}
