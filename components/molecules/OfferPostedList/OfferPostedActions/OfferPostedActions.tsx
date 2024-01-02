import { GroupIcon, TrashIcon } from '@/icons'
import { OfferPostedActionsProps } from '.'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ConfirmationModal } from '../../ConfirmModal'

export const OfferPostedActions = ({
  id,
  onDeleteClick,
  onCandidatesClick,
  isOfferOpen,
}: OfferPostedActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = () => {
    onDeleteClick(id)
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="flex gap-1.5">
        <TrashIcon
          className={cn('w-5 h-5 lg:w-6 lg:h-6', {
            'cursor-pointer': isOfferOpen,
            'opacity-50 cursor-default': !isOfferOpen,
          })}
          role="button"
          onClick={() => isOfferOpen && setIsModalOpen(true)}
        />
        <GroupIcon
          className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer"
          role="button"
          onClick={() => onCandidatesClick(id)}
        />
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        className="max-w-[500px]"
        title="Confirm Archiving"
        text="Are you sure you want to archive this offer? This cannot be undone, and candidates will no longer be able to apply."
        confirmText="Yes, archive it"
        cancelText="Cancel"
      />
    </>
  )
}
