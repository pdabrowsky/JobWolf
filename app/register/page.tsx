import { RegisterForm } from '@/components/organisms/RegisterForm'
import { notFound } from 'next/navigation'
import { UserRole } from '../actions/types'

type RegisterPageProps = { searchParams: { role: string } }

const RegisterPage = ({ searchParams }: RegisterPageProps) => {
  const { role } = searchParams

  if (role !== UserRole.Candidate && role !== UserRole.Employer) notFound()

  return (
    <div className="w-full flex justify-center py-[100px] px-5">
      <RegisterForm role={role} />
    </div>
  )
}
export default RegisterPage
