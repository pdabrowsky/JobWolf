import { MessageProps } from '.'

export const Message = ({ message }: MessageProps) => {
  const isUser = message.sender === 'user'
  return (
    <div
      className={`p-2 my-1 text-sm ${
        isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 mr-auto'
      } rounded-lg max-w-xs`}
    >
      {message.text}
    </div>
  )
}
