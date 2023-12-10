import { OfferDetails } from '@/components/organisms/OfferDetails'
import { getOffer } from '../actions/offer/getOffer'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const OfferPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const session = await getServerSession(authOptions)

  const offerId =
    typeof searchParams.id === 'string' ? searchParams.id : undefined

  if (!offerId) notFound()

  const offer = await getOffer(offerId, session?.user?.email)
  if (!offer) notFound()

  return (
    <div className="flex justify-center my-10 lg:my-20 px-5">
      <OfferDetails {...offer} />
    </div>
  )
}

export default OfferPage
