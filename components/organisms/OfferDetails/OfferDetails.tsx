import { OfferDetailsProps } from '.'
import { OfferHeader } from './OfferHeader'

export const OfferDetails = ({ title, city, employer }: OfferDetailsProps) => {
  return (
    <div>
      <OfferHeader
        title={title}
        city={city}
        companyName={employer.name}
        logoUrl={employer.logoUrl}
      />
    </div>
  )
}
