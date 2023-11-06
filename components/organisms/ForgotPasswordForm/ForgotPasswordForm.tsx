'use client'

import { forgotPassword } from '@/app/actions/forgotPassword'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { IconButton } from '@/components/atoms/IconButton'
import { TextField } from '@/components/atoms/TextField'
import { ArrowBackIcon } from '@/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormInput = z.infer<typeof RegisterSchema>

export const ForgotPasswordForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const message = await forgotPassword(data.email)

    if (message.type === 'success') {
      toast.success(message.msg)
      reset()
    } else {
      toast.error(message.msg)
    }
  }

  return (
    <Card className="max-w-[600px] w-full flex flex-col py-16 px-8 lg:px-24">
      <IconButton
        className="absolute top-3 left-3"
        icon={<ArrowBackIcon className="w-5 h-5" />}
        aria-label="Go back to the login page"
        onClick={() => router.push('/login')}
      />
      <h2 className="text-gold text-[26px] mx-auto mb-10 lg:mb-14 font-medium">
        Forgot Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Email"
          placeholder="Type your email"
          errors={errors}
          {...register('email', { required: true })}
        />
        <Button
          type="submit"
          className="mx-auto mt-6 lg:mt-8 font-semibold px-8"
          disabled={isSubmitting}
        >
          Reset password
        </Button>
      </form>
    </Card>
  )
}
