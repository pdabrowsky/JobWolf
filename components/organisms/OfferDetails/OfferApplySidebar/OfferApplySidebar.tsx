'use client'
import { useSession } from 'next-auth/react'
import { OfferApplySidebarProps } from '.'
import { Button } from '@/components/atoms/Button'
import { applyForOffer } from '@/app/actions/offer/applyForOffer'
import { toast } from 'react-toastify'
import { UserRole } from '@/app/actions/types'

export const OfferApplySidebarFrom = ({
  salary,
  offerId,
}: OfferApplySidebarProps) => {
  const { data: session } = useSession()
  const candidateEmail =
    session?.user?.role === UserRole.Candidate ? session.user.email : null

  const handleApply = async (candidateEmail: string) => {
    const response = await applyForOffer({
      candidateEmail: candidateEmail,
      offerId: offerId,
    })
    if (response.type === 'error') {
      toast.error(response.msg)
    } else {
      toast.success(response.msg)
    }
  }

  return (
    <aside className="sticky h-fit top-5 right-0 p-5 bg-darkLight rounded-[8px] text-gray shadow-lg">
      {salary.map((item, index) => (
        <div key={index} className="pb-2">
          <strong className="text-gold">{`${item.salaryFrom} - ${item.salaryTo} PLN`}</strong>
          <p className="text-[12px] lg:text-[13px]">{`Net/month - ${item.contractType}`}</p>
        </div>
      ))}
      {candidateEmail && (
        <div className="w-full flex justify-center">
          <Button
            onClick={() => handleApply(candidateEmail)}
            className="px-8 mt-4 font-bold"
          >
            Apply
          </Button>
        </div>
      )}
    </aside>
  )
}
