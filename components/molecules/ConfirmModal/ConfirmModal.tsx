import React from 'react'
import { ConfirmationModalProps } from './ConfirmModal.types'
import { Modal } from '../Modal'
import { Button } from '@/components/atoms/Button'

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  className,
  title = 'Confirm Action',
  text = 'Are you sure you want to proceed with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className={className}
    >
      <div className="text-center">
        <p className="pb-5">{text}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2">
            {cancelText}
          </button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
