import { getFavoriteOffers } from '../actions/offer/candidate/getFavoriteOffers'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import { UserRole } from '../actions/types'
import { OfferFavoriteList } from '@/components/molecules/OfferFavoriteList'

const FavoritesPage = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== UserRole.Candidate || !session?.user?.email) {
    notFound()
  }

  const offers = await getFavoriteOffers(session.user.email)

  return (
    <div className="flex flex-col gap-12 items-center justify-center my-12 w-full px-4">
      <h1 className="text-[16px] mr-auto lg:m-auto lg:text-2xl font-semibold lg:min-w-[800px]">
        Favorite offers
      </h1>
      <OfferFavoriteList
        offers={offers}
        candidateEmail={session.user.email}
        className="lg:min-w-[800px]"
      />
    </div>
  )
}
export default FavoritesPage
