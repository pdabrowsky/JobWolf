import { Card } from '@/components/atoms/Card'
import { OfferAttributeItemProps, OfferEmploymentDetailsProps } from '.'
import { CompasIcon } from '@/icons/CompasIcon'
import { SpeedIcon, StarIcon } from '@/icons'

const OfferAttributeItem = ({
  icon,
  label,
  value,
}: OfferAttributeItemProps) => {
  return (
    <div className="flex items-center gap-4 lg:w-1/3">
      <div aria-hidden="true">{icon}</div>
      <div className="flex flex-col">
        <strong className="text-[12px] lg:text-[15px] font-normal">
          {label}
        </strong>
        <p className="text-[12px] lg:text-[15px] font-semibold">{value}</p>
      </div>
    </div>
  )
}

export const OfferEmploymentDetails = ({
  experience,
  operatingMode,
  typeOfWork,
}: OfferEmploymentDetailsProps) => {
  return (
    <Card className="flex p-5 gap-4 flex-wrap lg:flex-nowrap">
      <OfferAttributeItem
        label="Experience"
        value={experience}
        icon={
          <StarIcon className="w-12 h-12 p-2.5 rounded-lg text-gold bg-darkGold" />
        }
      />
      <OfferAttributeItem
        label="Operating mode"
        value={operatingMode}
        icon={
          <CompasIcon className="w-12 h-12 p-2.5 rounded-lg text-lightBlue bg-blue" />
        }
      />
      <OfferAttributeItem
        label="Type of work"
        value={typeOfWork}
        icon={
          <SpeedIcon className="w-12 h-12 p-2.5 rounded-lg text-lightPurple bg-purple" />
        }
      />
    </Card>
  )
}
