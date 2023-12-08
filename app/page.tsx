import { Search } from '@/components/atoms/Search'
import { getOfferList } from './actions/offer/getOfferList'
import { OffersList } from '@/components/molecules/OfferList'
import { pluralize } from '@/lib/helpers'

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  // const limit =
  //   typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const offers = await getOfferList(search)

  return (
    <div className="flex flex-col items-center justify-center pt-12 w-full px-4">
      <Search className="max-w-[500px] mb-14" search={search} />
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
        {offers.length && (
          <OffersList offers={offers} className="lg:min-w-[800px]" />
        )}
      </div>
    </div>
  )
}
export default Home
