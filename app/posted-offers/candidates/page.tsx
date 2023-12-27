import { getOfferCandidates } from '@/app/actions/offer/getOfferCandidates'
import { CandidatesExplorer } from '@/components/organisms/CandidatesExplorer'
import { notFound } from 'next/navigation'

const PostedOfferCandidatesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const offerId =
    typeof searchParams.offer === 'string' ? searchParams.offer : undefined

  if (!offerId) return notFound()

  const candidates = await getOfferCandidates(offerId)

  return (
    <div className="flex flex-col gap-12 items-center justify-center pt-12 w-full px-4">
      <h1 className="text-[16px] mr-auto lg:m-auto lg:text-2xl font-semibold lg:min-w-[800px]">
        Applicants for this position
      </h1>
      {candidates.length ? (
        <CandidatesExplorer candidates={candidates} />
      ) : (
        <h2>No candidates found</h2>
      )}
    </div>
  )
}
export default PostedOfferCandidatesPage
