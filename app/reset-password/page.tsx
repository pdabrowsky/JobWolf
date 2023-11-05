import React, { ReactNode } from 'react'
import { ToastContainerWrapper } from '@/components/atoms/ToastContainer'
import { ForgotPasswordForm } from '@/components/organisms/ForgotPasswordForm'
import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { UserRole } from '../actions/register'

type ResetPasswordPageProps = {
  searchParams: {
    token?: string
  }
}

const findUserByToken = async (token: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { resetPasswordToken: token },
  })

  if (candidate) return { ...candidate, role: 'candidate' }

  const employer = await prisma.employer.findUnique({
    where: { resetPasswordToken: token },
  })

  if (employer) return { ...employer, role: 'employer' }

  return null
}

const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full flex justify-center pt-[100px] px-5">
    {children}
    <ToastContainerWrapper />
  </div>
)

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  if (searchParams.token) {
    const user = await findUserByToken(searchParams.token)
    if (!user) notFound()

    return (
      <ContentWrapper>
        <ResetPasswordForm userId={user.id} userRole={user.role as UserRole} />
      </ContentWrapper>
    )
  } else {
    return (
      <ContentWrapper>
        <ForgotPasswordForm />
      </ContentWrapper>
    )
  }
}

export default ResetPasswordPage
