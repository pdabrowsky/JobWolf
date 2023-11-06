'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { CustomResponse, UserRole } from '../types'

export const findUserByToken = async (token: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { resetPasswordToken: token },
  })
  if (candidate) return { ...candidate, role: UserRole.Candidate }

  const employer = await prisma.employer.findUnique({
    where: { resetPasswordToken: token },
  })
  if (employer) return { ...employer, role: UserRole.Employer }
}

export const resetPassword = async (
  resetPasswordToken: string,
  password: string
): Promise<CustomResponse> => {
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

  if (user.role === UserRole.Candidate) {
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
