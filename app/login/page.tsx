import { ToastContainerWrapper } from '@/components/atoms/ToastContainer'
import { LoginForm } from '@/components/organisms/LoginForm'

const LoginPage = () => {
  return (
    <div className="w-full flex justify-center pt-[100px] px-5">
      <LoginForm />
      <ToastContainerWrapper />
    </div>
  )
}
export default LoginPage
