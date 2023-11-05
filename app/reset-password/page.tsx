import { ToastContainerWrapper } from '@/components/atoms/ToastContainer'
import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <div className="w-full flex justify-center pt-[100px] px-5">
      <ResetPasswordForm />
      <ToastContainerWrapper />
    </div>
  )
}
export default ResetPasswordPage
