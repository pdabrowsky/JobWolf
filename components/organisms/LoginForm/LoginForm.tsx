'use client'

import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Card } from '@/components/atoms/Card'
import { TextField } from '@/components/atoms/TextField'
import { Button } from '@/components/atoms/Button'
import { DropdownMenu } from '@/components/atoms/Dropdown'
import { toast } from 'react-toastify'
import Link from 'next/link'

const dropdownOptions = [
  { label: 'Candidate', href: '/register?role=candidate' },
  { label: 'Employer', href: '/register?role=employer' },
]

export const LoginForm = () => {
  const router = useRouter()
  const { status } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const signInResponse = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (!signInResponse || !signInResponse.ok) {
        setError('email', {
          type: 'manual',
          message: 'Authentication failed. Please check your credentials.',
        })
        setError('password', {
          type: 'manual',
          message: 'Authentication failed. Please check your credentials.',
        })
      } else {
        router.refresh()
        router.push('/')
        toast.success('Login successful')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh()
      router.push('/')
    }
  }, [router, status])

  return (
    <Card className="max-w-[600px] w-full flex flex-col py-[90px] px-8 lg:px-24">
      <h2 className="text-gold text-[26px] mx-auto mb-10 lg:mb-14 font-medium">
        Login
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-5"
      >
        <TextField
          label="Email"
          placeholder="name@domain.com"
          errors={errors}
          {...register('email', { required: true })}
        />
        <TextField
          label="Password"
          placeholder="Your password"
          errors={errors}
          type="password"
          {...register('password', { required: true })}
        />
        <Link href="/reset-password" className="text-[11px] lg:text-[12px]">
          Forget password?
        </Link>
        <Button
          type="submit"
          className="mx-auto mt-6 lg:mt-8 font-semibold px-8"
        >
          Login
        </Button>
      </form>
      <div className="flex items-center mx-auto gap-1.5">
        <p className="text-[11px] lg:text-[12px] ">
          Don&apos;t have an account?
        </p>
        <DropdownMenu options={dropdownOptions}>
          <button
            type="button"
            className="text-gold text-[11px] lg:text-[12px] flex items-center justify-center"
          >
            Sign up
          </button>
        </DropdownMenu>
      </div>
    </Card>
  )
}
