import { GroupIcon, TrashIcon } from '@/icons'
import { OfferPostedActionsProps } from '.'
import { cn } from '@/lib/utils'

export const OfferPostedActions = ({
  id,
  // onEditClick,
  onDeleteClick,
  onCandidatesClick,
}: OfferPostedActionsProps) => {
  return (
    <div className="flex gap-1.5">
      {/* <EditIcon
        className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer"
        role="button"
        onClick={() => onEditClick(id)}
      /> */}
      <TrashIcon
        className={cn('w-5 h-5 lg:w-6 lg:h-6', {
          'cursor-pointer': onDeleteClick,
          'opacity-50 cursor-default': !onDeleteClick,
        })}
        role="button"
        onClick={() => onDeleteClick && onDeleteClick(id)}
      />
      <GroupIcon
        className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer"
        role="button"
        onClick={() => onCandidatesClick(id)}
      />
    </div>
  )
}
