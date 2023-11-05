import React, { ReactNode } from 'react'
import { ForgotPasswordForm } from '@/components/organisms/ForgotPasswordForm'
import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'

type ResetPasswordPageProps = {
  searchParams: {
    token?: string
  }
}

const findUserByToken = async (token: string) => {
  return (
    (await prisma.candidate.findUnique({
      where: { resetPasswordToken: token },
    })) ||
    (await prisma.employer.findUnique({
      where: { resetPasswordToken: token },
    }))
  )
}

const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full flex justify-center pt-[100px] px-5">{children}</div>
)

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  if (searchParams.token) {
    const user = await findUserByToken(searchParams.token)
    if (!user) notFound()

    return (
      <ContentWrapper>
        <ResetPasswordForm resetPasswordToken={searchParams.token} />
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
