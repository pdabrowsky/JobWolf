import { Card } from '@/components/atoms/Card'
import { OfferCompanyDetailsProps } from '.'

export const OfferCompanyDetails = ({
  name,
  description,
}: OfferCompanyDetailsProps) => {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-xs lg:text-[15px] leading-relaxed">{description}</p>
    </Card>
  )
}
