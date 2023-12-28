import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import { UserRole } from '../actions/types'
import { getEmployerOffers } from '../actions/offer/getEmployerOffers'
import { OfferPostedList } from '@/components/molecules/OfferPostedList'
import { BackToTopButton } from '@/components/atoms/BackToTopButton'

const PostedOffers = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== UserRole.Employer || !session?.user?.email) {
    notFound()
  }

  const { hasNextPage, offers } = await getEmployerOffers(session.user.email)

  const getOffers = async (page: number) => {
    'use server'
    return await getEmployerOffers(session.user.email as string, page)
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-center my-12 w-full px-4">
      <h1 className="text-[16px] mr-auto lg:m-auto lg:text-2xl font-semibold lg:min-w-[800px]">
        My offers
      </h1>
      {offers.length ? (
        <OfferPostedList
          offers={offers}
          className="lg:min-w-[800px]"
          getOffers={getOffers}
          defaultHasNextPage={hasNextPage}
        />
      ) : (
        <p className="mx-auto">No posted offers</p>
      )}
      <BackToTopButton />
    </div>
  )
}
export default PostedOffers
