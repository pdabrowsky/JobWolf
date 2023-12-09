import { OfferDetailsProps } from '.'
import { OfferEmploymentDetails } from './OfferEmploymentDetails'
import { OfferHeader } from './OfferHeader'

export const OfferDetails = ({
  title,
  city,
  employer,
  experience,
  operatingMode,
  typeOfWork,
}: OfferDetailsProps) => {
  return (
    <main className=" flex flex-col gap-4">
      <OfferHeader
        title={title}
        city={city}
        companyName={employer.name}
        logoUrl={employer.logoUrl}
      />
      <OfferEmploymentDetails
        experience={experience.name}
        operatingMode={operatingMode.name}
        typeOfWork={typeOfWork.name}
      />
    </main>
  )
}
