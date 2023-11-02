'use client'

import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterFormProps } from '.'
import { register as registerAction } from '@/app/actions/users'
import { useState } from 'react'
import { Card } from '@/components/atoms/Card/Card'
import { ErrorMessage } from '@/components/atoms/ErrorMessage'
import { Button } from '@/components/atoms/Button'
import { Checkbox } from '@/components/atoms/Checkbox'
import { TextField } from '@/components/atoms/TextField'

const RegisterSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password should be at least 8 characters long'),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormInput = z.infer<typeof RegisterSchema>

export const RegisterForm = ({ role }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(RegisterSchema),
  })
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (data.password !== data.confirmPassword) return

    const message = await registerAction(data.email, data.password, role)
    setMessage(message)
  }

  const [message, setMessage] = useState('')

  return (
    <Card className="max-w-[600px] w-full flex flex-col p-10 lg:px-24">
      <h2 className="text-gold text-[26px] mx-auto pt-6 mb-10 lg:mb-14 font-medium">
        Create account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Email"
          placeholder="name@domain.com"
          errors={errors}
          {...register('email')}
        />
        <TextField
          label="Password"
          placeholder="At least 8 characters"
          errors={errors}
          {...register('password')}
        />
        <TextField
          label="Confirm Password"
          placeholder="Type your password again"
          errors={errors}
          {...register('confirmPassword')}
        />
        <Checkbox
          label="I confirm that I've read and I agree to the site's Terms & Conditions and Privacy Policy."
          errors={errors}
          {...register('acceptTerms')}
        />
        <Button
          type="submit"
          className="mx-auto mt-10 lg:mt-14 font-semibold px-8"
        >
          Sign up
        </Button>
      </form>
      <ErrorMessage errorText={message} />
    </Card>
  )
}
