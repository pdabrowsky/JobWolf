import { PostJobForm } from '@/components/organisms/PostJobForm'
import { getFilltersOptions } from '../actions/offer/getFilterOptions'
import { getServerSession } from 'next-auth'
import { UserRole } from '../actions/types'
import { notFound } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getEmployerProfile } from '../actions/profile/employer'
import { routes } from '@/constants/routes'
import Link from 'next/link'

const PostJobPage = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== UserRole.Employer || !session?.user?.email) {
    notFound()
  }
  const { data } = await getEmployerProfile(session.user.email)
  const isProfileFilled =
    data?.name &&
    data?.city &&
    data?.address &&
    data?.phone &&
    data?.description &&
    data?.logoUrl

  let options
  if (isProfileFilled) options = await getFilltersOptions()

  return (
    <div className="flex justify-center my-10 lg:my-20 px-5">
      {isProfileFilled && options ? (
        <PostJobForm selectOptions={options} />
      ) : (
        <h2 className="text-lg text-center">
          To post an offer, please complete your profile
          <Link className="text-gold mx-1" href={routes.PROFILE}>
            here
          </Link>
        </h2>
      )}
    </div>
  )
}

export default PostJobPage
