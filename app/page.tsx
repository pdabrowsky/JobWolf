import { Search } from '@/components/atoms/Search'
import { getOfferList } from './actions/offer/getOfferList'
import { OffersList } from '@/components/molecules/OfferList'
import { pluralize } from '@/lib/helpers'
import { BackToTopButton } from '@/components/atoms/BackToTopButton'
import { SearchFilters } from '@/components/organisms/SearchFilters'
import { transformQueryParamToArray } from '@/components/organisms/SearchFilters/SearchFiltersForm/SearchFiltersForm.helpers'
import { getSelectOptions } from './actions/offer/getSelectOptions'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { UserRole } from './actions/types'

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const session = await getServerSession(authOptions)
  const employerEmail =
    session?.user?.role === UserRole.Employer &&
    session?.user?.email?.toString()

  const filterOptions = await getSelectOptions()

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const { offers, totalOffers, hasNextPage } = await getOfferList(
    search,
    1,
    {
      experience: transformQueryParamToArray(searchParams.experience),
      typeOfWork: transformQueryParamToArray(searchParams.typeOfWork),
      contractType: transformQueryParamToArray(searchParams.contractType),
      operatingMode: transformQueryParamToArray(searchParams.operatingMode),
      technology: transformQueryParamToArray(searchParams.techStack),
      salaryFrom: Number(searchParams.salaryFrom) || undefined,
      salaryTo: Number(searchParams.salaryTo) || undefined,
    },
    employerEmail
  )

  const getOffers = async (page: number) => {
    'use server'

    const offers = await getOfferList(
      search,
      page,
      {
        experience: transformQueryParamToArray(searchParams.experience),
        typeOfWork: transformQueryParamToArray(searchParams.typeOfWork),
        contractType: transformQueryParamToArray(searchParams.contractType),
        operatingMode: transformQueryParamToArray(searchParams.operatingMode),
        technology: transformQueryParamToArray(searchParams.technology),
        salaryFrom: Number(searchParams.salaryFrom) || undefined,
        salaryTo: Number(searchParams.salaryTo) || undefined,
      },
      employerEmail
    )
    return offers
  }

  return (
    <div className="min-h-screen py-12 flex flex-col items-center w-full px-4">
      <div className="flex justify-center mb-14 w-full gap-2">
        <Search className="max-w-[500px] w-full" />
        <SearchFilters filterOptions={filterOptions} />
      </div>
      <div>
        <div className="mb-4 flex">
          {offers.length ? (
            <p className="text-[14px] lg:text-[16px] text-gold font-semibold">
              Found {totalOffers} {pluralize(totalOffers, 'offer', 'offers')}
            </p>
          ) : (
            <p>No offers</p>
          )}
        </div>
        {!!offers.length && (
          <OffersList
            offers={offers}
            className="lg:min-w-[800px]"
            getOffers={getOffers}
            defaultHasNextPage={hasNextPage}
            key={offers.length}
          />
        )}
      </div>
      <BackToTopButton />
    </div>
  )
}
export default Home
