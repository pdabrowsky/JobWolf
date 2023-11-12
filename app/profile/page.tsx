import { Sidebar } from '@/components/molecules/Sidebar'
import { routes } from '@/constants/routes'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { ChangePasswordForm } from '@/components/organisms/ChangePasswordForm'

type ProfilePageProps = { searchParams: { tab: string } }

// TODO Refactor tab types
const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
  const session = await getServerSession(authOptions)
  const { tab } = searchParams

  if (!session || !session.user.email) redirect(routes.LOGIN)
  if (tab && tab !== 'settings') notFound()

  return (
    <div className="flex justify-center items-center lg:items-start flex-col lg:flex-row gap-5 lg:gap-4 mt-10 lg:mt-[100px] px-5">
      <Sidebar activeTab={tab === 'settings' ? 'settings' : 'profile'} />
      {tab === 'settings' ? <ChangePasswordForm /> : null}
    </div>
  )
}

export default ProfilePage
