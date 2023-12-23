import { Search } from '@/components/atoms/Search'
import { getOfferList } from './actions/offer/getOfferList'
import { OffersList } from '@/components/molecules/OfferList'
import { pluralize } from '@/lib/helpers'
import { BackToTopButton } from '@/components/atoms/BackToTopButton'
import { SearchFilters } from '@/components/organisms/SearchFilters'

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const offers = await getOfferList(search)

  const getOffers = async (page: number) => {
    'use server'

    const offers = await getOfferList(search, page)
    return offers
  }

  return (
    <div className="min-h-screen py-12 flex flex-col items-center w-full px-4">
      <div className="flex justify-center mb-14 w-full gap-2">
        <Search className="max-w-[500px] w-full" />
        <SearchFilters />
      </div>
      <div>
        <div className="mb-4 flex">
          {offers.length ? (
            <p className="text-[14px] lg:text-[16px] text-gold font-semibold">
              Found {offers.length}{' '}
              {pluralize(offers.length, 'offer', 'offers')}
            </p>
          ) : (
            <p>No offers</p>
          )}
        </div>
        {!!offers.length && (
          <OffersList
            offers={offers}
            className="lg:min-w-[800px]"
            search={search}
            getOffers={getOffers}
            key={search}
          />
        )}
      </div>
      <BackToTopButton />
    </div>
  )
}
export default Home
