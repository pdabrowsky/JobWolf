import { Card } from '@/components/atoms/Card'
import { OfferDescriptionProps } from '.'

export const OfferDescription = ({ description }: OfferDescriptionProps) => {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Job Description</h2>
      <p className="text-xs lg:text-[15px] leading-relaxed">{description}</p>
    </Card>
  )
}
