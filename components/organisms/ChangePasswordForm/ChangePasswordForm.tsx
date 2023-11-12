'use client'

import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/atoms/Card/Card'
import { Button } from '@/components/atoms/Button'
import { TextField } from '@/components/atoms/TextField'
import { toast } from 'react-toastify'
import { changePassword } from '@/app/actions/changePassword'
import { useSession } from 'next-auth/react'
import { UserRole } from '@/app/actions/types'

const RegisterSchema = z
  .object({
    currentPassword: z.string().min(1, 'Field is required'),
    newPassword: z
      .string()
      .min(8, 'Password should be at least 8 characters long'),
    confirmNewPassword: z.string().min(1, 'Field is required'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormInput = z.infer<typeof RegisterSchema>

export const ChangePasswordForm = () => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormInput>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit: SubmitHandler<FormInput> = async ({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    if (newPassword !== confirmNewPassword) return

    const message = await changePassword(
      currentPassword,
      newPassword,
      session?.user.email,
      session?.user.role as UserRole
    )

    if (message.type === 'success') {
      toast.success(message.msg)
      reset()
    } else {
      setError('currentPassword', {
        type: 'manual',
        message: message.msg,
      })
      toast.error(message.msg)
    }
  }

  return (
    <Card className="max-w-[500px] w-full flex flex-col p-4 px-6 lg:px-6">
      <h2 className="text-[22px] mb-3 font-medium">Settings</h2>
      <h4 className="text-[16px] mb-8 lg:mb-8 font-medium">Change password</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Current Password"
          placeholder="Type your current password"
          type="password"
          errors={errors}
          {...register('currentPassword')}
        />
        <TextField
          label="Password"
          placeholder="At least 8 characters"
          type="password"
          errors={errors}
          {...register('newPassword')}
        />
        <TextField
          label="Confirm Password"
          type="password"
          placeholder="Type your password again"
          errors={errors}
          {...register('confirmNewPassword')}
        />
        <Button
          type="submit"
          className="mx-auto mt-10 lg:mt-14 font-semibold px-8"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </form>
    </Card>
  )
}
