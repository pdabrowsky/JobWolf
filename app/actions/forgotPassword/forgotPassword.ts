'use server'

import prisma from '@/lib/prisma'
import cryptoRandomString from 'crypto-random-string'

export const findUserByEmail = async (email: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { email },
  })
  if (candidate) return { ...candidate, role: 'candidate' }

  const employer = await prisma.employer.findUnique({
    where: { email },
  })
  if (employer) return { ...employer, role: 'employer' }
}

export const forgotPassword = async (email: string) => {
  const user = await findUserByEmail(email)

  if (!user) return { type: 'error', msg: 'Email not found' }

  //TODO zabepieczenie przed DDOS - czas resend mail, sprawdzenie wygaśnięcia tokenu

  const resetPasswordToken = cryptoRandomString({
    length: 15,
    type: 'url-safe',
  })

  const today = new Date()
  const resetPasswordTokenExpiry = new Date(today.setDate(today.getDate() + 1)) //24h

  if (user.role === 'candidate') {
    await prisma.candidate.update({
      where: { email: email },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiry,
      },
    })
  } else {
    await prisma.employer.update({
      where: { email: email },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiry,
      },
    })
  }

  //TODO: send email
  console.log(
    `http://localhost:3000/reset-password?token=${resetPasswordToken}`
  )
  return { type: 'success', msg: 'Email sent' }
}
