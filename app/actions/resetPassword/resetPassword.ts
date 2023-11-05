'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const findUserByToken = async (token: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { resetPasswordToken: token },
  })
  if (candidate) return { ...candidate, role: 'candidate' }

  const employer = await prisma.employer.findUnique({
    where: { resetPasswordToken: token },
  })
  if (employer) return { ...employer, role: 'employer' }
}

export const resetPassword = async (
  resetPasswordToken: string,
  password: string
) => {
  const user = await findUserByToken(resetPasswordToken)

  if (!user) {
    return { type: 'error', msg: 'User not found' }
  }

  if (
    !user.resetPasswordTokenExpiry ||
    new Date() > user.resetPasswordTokenExpiry
  ) {
    return { type: 'error', msg: 'Token expired' }
  }

  const passwordHash = bcrypt.hashSync(password, 10)

  if (user.role === 'candidate') {
    await prisma.candidate.update({
      where: { id: user.id },
      data: {
        password: passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    })
  } else {
    await prisma.employer.update({
      where: { id: user.id },
      data: {
        password: passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    })
  }

  return { type: 'success', msg: 'Password changed' }
}
