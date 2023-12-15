import { cn } from '@/lib/utils'
import { MessageProps } from '.'

export const Message = ({ message }: MessageProps) => {
  const isUser = message.role === 'user'
  return (
    <div
      className={cn(
        'p-2 text-sm whitespace-pre-wrap md:max-w-[90%] bg-darkGray rounded-lg flex gap-2',
        isUser ? 'ml-auto' : 'mr-auto'
      )}
    >
      {!isUser && (
        <span className="text-lightPurple font-bold bg-purple p-2 rounded-full text-xs h-fit leading-none">
          AI
        </span>
      )}
      <div>
        {message.content
          .split('\n')
          .map((currentTextBlock: string, index: number) => {
            if (currentTextBlock === '') {
              return <p key={message.id + index}>&nbsp;</p>
            } else {
              return <p key={message.id + index}>{currentTextBlock}</p>
            }
          })}
      </div>
    </div>
  )
}
