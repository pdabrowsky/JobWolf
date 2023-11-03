import { ToastContainerWrapper } from '@/components/atoms/ToastContainer'
import { ForgotPasswordForm } from '@/components/organisms/ForgotPasswordForm'

const ForgotPage = () => {
  return (
    <div className="w-full flex justify-center pt-[100px] px-5">
      <ForgotPasswordForm />
      <ToastContainerWrapper />
    </div>
  )
}
export default ForgotPage
