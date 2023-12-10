import { OfferDetailsProps } from '.'
import { OfferApplySidebarFrom } from './OfferApplySidebar'
import { OfferCompanyDetails } from './OfferCompanyDetails'
import { OfferDescription } from './OfferDescription'
import { OfferEmploymentDetails } from './OfferEmploymentDetails'
import { OfferHeader } from './OfferHeader'
import { OfferTechStack } from './OfferTechStack'

export const OfferDetails = ({
  title,
  id,
  city,
  employer,
  experience,
  operatingMode,
  mustHaveTech,
  niceToHaveTech,
  description,
  typeOfWork,
}: OfferDetailsProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
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
        <OfferTechStack
          mustHaveTech={mustHaveTech}
          niceToHaveTech={niceToHaveTech}
        />
        <OfferDescription description={description} />
      </main>
      <OfferApplySidebarFrom
        salary={[
          {
            salaryFrom: 10000,
            salaryTo: 15000,
            contractType: 'B2B',
          },
          {
            salaryFrom: 9000,
            salaryTo: 14000,
            contractType: 'Work Contract',
          },
        ]}
        offerId={id}
      />
    </div>
  )
}
