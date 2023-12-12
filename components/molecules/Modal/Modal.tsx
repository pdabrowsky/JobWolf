import React from 'react'
import { CloseIcon } from '@/icons'
import { ModalProps } from '.'
import { cn } from '@/lib/utils'

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget === event.target) {
      onClose()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={cn(
          'bg-darkLight p-4 rounded-lg shadow-lg relative w-full lg:w-fit lg:min-w-[500px] mx-5',
          className
        )}
      >
        <div className="flex justify-between items-center mb-10">
          {typeof title === 'string' ? (
            <h2 className="text-lg font-semibold">{title}</h2>
          ) : (
            title
          )}
          <button onClick={onClose} aria-label="Close modal">
            <CloseIcon className="w-7 h-7 p-0.5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
