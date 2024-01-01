'use client'

import { useSession } from 'next-auth/react'
import { OfferApplySidebarProps } from '.'
import { Button } from '@/components/atoms/Button'
import { applyForOffer } from '@/app/actions/offer/candidate/applyForOffer'
import { toast } from 'react-toastify'
import { UserRole } from '@/app/actions/types'
import { Tooltip } from 'react-tooltip'
import { useState } from 'react'

export const OfferApplySidebarFrom = ({
  salary,
  offerId,
  hasApplied,
  isOpen,
  isProfileFilled,
}: OfferApplySidebarProps) => {
  const { data: session } = useSession()
  const [hasAppliedState, setHasAppliedState] = useState(hasApplied)

  const candidateEmail =
    session?.user?.role === UserRole.Candidate ? session.user.email : null

  const handleApply = async (candidateEmail: string) => {
    const response = await applyForOffer({
      candidateEmail: candidateEmail,
      offerId: offerId,
    })
    if (response.type === 'success') {
      toast.success(response.msg)
      setHasAppliedState(true)
    } else {
      toast.error(response.msg)
    }
  }

  return (
    <aside className="sticky h-fit top-5 right-0 p-5 bg-darkLight rounded-[8px] text-gray shadow-lg">
      {!!salary.length &&
        salary.map((item, index) => (
          <div key={index} className="pb-2">
            <strong className="text-gold">{`${item.salaryFrom} - ${item.salaryTo} PLN`}</strong>
            <p className="text-[12px] lg:text-[13px]">{`Net/month - ${item.contractType}`}</p>
          </div>
        ))}
      {candidateEmail && (
        <div className="w-full flex justify-center">
          <Button
            onClick={() => handleApply(candidateEmail)}
            disabled={hasAppliedState || !isProfileFilled || isOpen === false}
            data-tooltip-id="apply"
            data-tooltip-content={
              (hasAppliedState && 'Already applied') ||
              (!isProfileFilled && 'Please fill your profile first') ||
              (isOpen === false && 'Recruitment has ended') ||
              ''
            }
            className="px-8 mt-4 font-bold"
          >
            Apply
          </Button>
          {!!(hasAppliedState || !isProfileFilled || isOpen === false) && (
            <Tooltip id="apply" />
          )}
        </div>
      )}
    </aside>
  )
}
