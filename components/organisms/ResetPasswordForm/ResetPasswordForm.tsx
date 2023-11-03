'use client'

import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { TextField } from '@/components/atoms/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const RegisterSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password should be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormInput = z.infer<typeof RegisterSchema>

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      console.log(data)
      //TODO: Add forgot password logic
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="max-w-[600px] w-full flex flex-col py-16 px-8 lg:px-24">
      <h2 className="text-gold text-[26px] mx-auto mb-10 lg:mb-14 font-medium">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Password"
          placeholder="At least 8 characters"
          type="password"
          errors={errors}
          {...register('password')}
        />
        <TextField
          label="Confirm Password"
          type="password"
          placeholder="Type your password again"
          errors={errors}
          {...register('confirmPassword')}
        />
        <Button
          type="submit"
          className="mx-auto mt-6 lg:mt-8 font-semibold px-8"
        >
          Change password
        </Button>
      </form>
    </Card>
  )
}
