export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string | React.ReactNode
  children: React.ReactNode
}
