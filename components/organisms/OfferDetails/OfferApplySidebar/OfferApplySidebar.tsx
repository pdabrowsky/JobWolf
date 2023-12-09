import { OfferApplySidebarProps } from '.'
import { Button } from '@/components/atoms/Button'

export const OfferApplySidebarFrom = ({ salary }: OfferApplySidebarProps) => {
  return (
    <aside className="sticky h-fit top-5 right-0 p-5 bg-darkLight rounded-[8px] text-gray shadow-lg">
      {salary.map((item, index) => (
        <div key={index} className="pb-2">
          <strong className="text-gold">{`${item.salaryFrom} - ${item.salaryTo} PLN`}</strong>
          <p className="text-[12px] lg:text-[13px]">{`Net/month - ${item.contractType}`}</p>
        </div>
      ))}
      <div className="w-full flex justify-center">
        <Button className="px-8 mt-4 font-bold">Apply</Button>
      </div>
    </aside>
  )
}
