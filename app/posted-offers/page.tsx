import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import { UserRole } from '../actions/types'
import { getEmployerOffers } from '../actions/offer/getEmployerOffers'
import { OfferPostedList } from '@/components/molecules/OfferPostedList'

const PostedOffers = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== UserRole.Employer || !session?.user?.email) {
    notFound()
  }

  const offers = await getEmployerOffers(session.user.email)

  return (
    <div className="flex flex-col gap-12 items-center justify-center pt-12 w-full px-4">
      <h1 className="text-[16px] mr-auto lg:m-auto lg:text-2xl font-semibold lg:min-w-[800px]">
        Posted offers
      </h1>
      <OfferPostedList
        offers={offers}
        employerEmail={session.user.email}
        className="lg:min-w-[800px]"
      />
    </div>
  )
}
export default PostedOffers
