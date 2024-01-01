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
  isAddedToFavourites,
  employer,
  experience,
  operatingMode,
  mustHaveTech,
  niceToHaveTech,
  description,
  typeOfWork,
  salaryRanges,
  isOpen,
  hasApplied,
  isProfileFilled,
}: OfferDetailsProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <main className=" flex flex-col gap-4 lg:w-[800px] max-w-[800px]">
        <OfferHeader
          offerId={id}
          title={title}
          city={city}
          companyName={employer.name}
          logoUrl={employer.logoUrl}
          isAddedToFavourites={isAddedToFavourites}
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
        salary={salaryRanges}
        offerId={id}
        hasApplied={hasApplied}
        isProfileFilled={isProfileFilled}
        isOpen={isOpen}
      />
    </div>
  )
}
