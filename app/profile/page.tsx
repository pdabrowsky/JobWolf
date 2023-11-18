import { Sidebar } from '@/components/molecules/Sidebar'
import { routes } from '@/constants/routes'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { ChangePasswordForm } from '@/components/organisms/ChangePasswordForm'
import { CandidateProfileForm } from '@/components/organisms/CandidateProfileForm'
import { getCandidateProfile } from '../actions/candidate/profile'
import { UserRole } from '../actions/types'
import { EmployerProfileForm } from '@/components/organisms/EmployerProfileForm'

type ProfilePageProps = { searchParams: { tab: string } }

// TODO Refactor tab types
const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
  const session = await getServerSession(authOptions)
  const { tab } = searchParams

  if (!session || !session.user.email || !session.user.role)
    redirect(routes.LOGIN)
  if (tab && tab !== 'settings') notFound()

  let defaultData
  if (session.user.role === UserRole.Candidate) {
    defaultData = (await getCandidateProfile(session.user.email)).data
  } else {
    // Assuming you have a similar function for employers
    // defaultData = await getEmployerProfile(session.user.email);
  }

  return (
    <div className="flex justify-center items-center lg:items-start flex-col lg:flex-row gap-5 lg:gap-4 mt-10 lg:mt-20 px-5">
      <Sidebar activeTab={tab === 'settings' ? 'settings' : 'profile'} />
      {tab === 'settings' ? (
        <ChangePasswordForm />
      ) : (
        <>
          {session.user.role !== UserRole.Candidate ? (
            <CandidateProfileForm defaultData={defaultData} />
          ) : (
            <EmployerProfileForm />
          )}
        </>
      )}
    </div>
  )
}

export default ProfilePage
