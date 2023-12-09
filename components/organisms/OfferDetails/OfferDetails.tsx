import { OfferDetailsProps } from '.'
import { OfferCompanyDetails } from './OfferCompanyDetails'
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
    <main className=" flex flex-col gap-4 lg:w-[800px] max-w-[800px]">
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
      <OfferCompanyDetails
        name={employer.name}
        description={employer.description}
      />
    </main>
  )
}
