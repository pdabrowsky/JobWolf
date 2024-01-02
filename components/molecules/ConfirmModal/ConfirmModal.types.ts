export type ConfirmationModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  text?: string
  confirmText?: string
  cancelText?: string
  className?: string
}
