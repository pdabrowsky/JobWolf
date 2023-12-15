'use client'

import { cn } from '@/lib/utils'
import { ChatAIProps } from '.'
import { useState } from 'react'
import { Modal } from '@/components/molecules/Modal'
import { Tooltip } from 'react-tooltip'
import { ChatIcon, SendIcon } from '@/icons'
import { useChat } from 'ai/react'
import { TextField } from '@/components/atoms/TextField'
import { Message } from './Message'

export const ChatAI = ({ className }: ChatAIProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        jobDetails:
          'Junior Frontend Developer with required technologies including React, css, HTML, and JavaScript.',
      },
    })

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
        className="lg:w-[550px]"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Virtual Assistant"
      >
        <>
          <div
            className={cn(
              'gap-4 w-full overflow-hidden overflow-y-auto overscroll-contain h-96 lg:h-[400px] border border-borderMid rounded-lg p-3 space-y-2 flex flex-col-reverse scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-darkGray scrollbar-thumb-neutral-900',
              className
            )}
          >
            {[...messages].reverse().map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="relative w-full flex mt-4">
            <TextField
              label="Virtual Assistant"
              name="Virtual Assistant"
              placeholder="Type answer here..."
              onChange={handleInputChange}
              labelClassName="sr-only"
              value={input}
              className="w-full pr-10"
              autoComplete="off"
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading}
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
