import { UserRole } from '@/app/actions/register'
import { ToastContainerWrapper } from '@/components/atoms/ToastContainer'
import { RegisterForm } from '@/components/organisms/RegisterForm'
import { notFound } from 'next/navigation'

type Params = { params: { role: string } }

const RegisterPage = ({ params }: Params) => {
  let { role } = params
  if (role !== 'candidate' && role !== 'employer') notFound()

  return (
    <div className="w-full flex justify-center pt-[100px] px-5">
      <RegisterForm role={role as UserRole} />
      <ToastContainerWrapper />
    </div>
  )
}
export default RegisterPage
