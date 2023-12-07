import { Search } from '@/components/atoms/Search'
import { getOfferList } from './actions/offer/getOfferList'
import { OffersList } from '@/components/molecules/OfferList'

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
    <div className="flex flex-col items-center gap-14 justify-center pt-12 w-full px-4">
      <Search className="max-w-[500px]" search={search} />
      {offers.length ? (
        <OffersList offers={offers} className="lg:min-w-[800px]" />
      ) : (
        <p>No offers</p>
      )}
    </div>
  )
}
export default Home
