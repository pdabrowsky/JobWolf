import React, { ReactNode } from 'react'
import { ForgotPasswordForm } from '@/components/organisms/ForgotPasswordForm'
import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm'
import { notFound } from 'next/navigation'
import { findUserByToken } from '../actions/resetPassword'

type ResetPasswordPageProps = {
  searchParams: {
    token?: string
  }
}

const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full flex justify-center py-[100px] px-5">{children}</div>
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
