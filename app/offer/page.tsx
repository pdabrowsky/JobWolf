import { OfferDetails } from '@/components/organisms/OfferDetails'
import { getOfferDetails } from '../actions/offer/getOfferDetails'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { ChatAI } from '@/components/organisms/ChatAI'
import { UserRole } from '../actions/types'
import { getCandidateProfile } from '../actions/profile/candidate'

const OfferPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const session = await getServerSession(authOptions)
  const isCandidate = session?.user?.role === UserRole.Candidate
  let isProfileFilled = false

  const offerId =
    typeof searchParams.id === 'string' ? searchParams.id : undefined

  if (!offerId) notFound()

  const offer = await getOfferDetails(offerId, session?.user?.email)
  if (!offer) notFound()

  // Check if candidate profile is filled
  if (session?.user?.email && isCandidate) {
    const { data } = await getCandidateProfile(session?.user?.email)
    if (data?.firstName && data?.lastName && data?.phone && data?.fileUrl) {
      isProfileFilled = true
    }
  }

  return (
    <div className="flex justify-center my-10 lg:my-20 px-5">
      <OfferDetails {...offer} isProfileFilled={isProfileFilled} />
      {isCandidate && <ChatAI offerDetails={offer} />}
    </div>
  )
}

export default OfferPage
