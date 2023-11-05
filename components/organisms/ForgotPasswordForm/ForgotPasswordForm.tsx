'use client'

import { forgotPassword } from '@/app/actions/forgotPassword'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { TextField } from '@/components/atoms/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormInput = z.infer<typeof RegisterSchema>

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        >
          Reset password
        </Button>
      </form>
    </Card>
  )
}