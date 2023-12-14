'use client'

import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { ChatAIProps } from '.'
import { useState } from 'react'
import { MessageType, Message } from './Message'
import { Modal } from '@/components/molecules/Modal'
import { Tooltip } from 'react-tooltip'
import { ChatIcon, SendIcon } from '@/icons'
import { TextField } from '@/components/atoms/TextField'

export const ChatAI = ({ className }: ChatAIProps) => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit, reset } = useForm<{ messageInput: string }>()

  const onSendMessage = (data: { messageInput: string }) => {
    const newMessage: MessageType = {
      id: Date.now(),
      text: data.messageInput,
      sender: 'user',
    }
    setMessages([...messages, newMessage])

    setTimeout(() => {
      const aiMessage: MessageType = {
        id: Date.now() + 1,
        text: 'This is an automated response from AI.',
        sender: 'ai',
      }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    }, 1000)

    reset()
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        data-tooltip-id="chat-ai"
        data-tooltip-content="AI Chat for Interview Preparation"
        className="fixed z-10 right-7 bottom-7 lg:bottom-10 lg:right-10 cursor-pointer p-2 rounded-full bg-purple flex items-center justify-center"
      >
        <ChatIcon className="w-6 h-6 text-lightPurple" />
      </button>
      <Tooltip id="chat-ai" />
      <Modal
        className=""
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Virtual Assistant"
      >
        <>
          <div
            className={cn(
              'w-full overflow-hidden overflow-y-auto overscroll-contain h-96 border border-borderMid rounded-lg p-3 space-y-2 flex flex-col-reverse scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-darkGray scrollbar-thumb-neutral-900',
              className
            )}
          >
            {[...messages].reverse().map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          <form
            onSubmit={handleSubmit(onSendMessage)}
            className="relative w-full flex mt-4"
          >
            <TextField
              label="Name"
              placeholder="Type answer here..."
              labelClassName="sr-only"
              className="w-full"
              autoComplete="off"
              autoFocus
              {...register('messageInput')}
            />
            <button
              type="submit"
              className="absolute px-2 right-0 top-1/2 transform -translate-y-1/2 h-full"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </>
      </Modal>
    </>
  )
}
