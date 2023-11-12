'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { CustomResponse, UserRole } from '../types'

export const findUser = async (email: string, role: UserRole) => {
  if (role === UserRole.Candidate)
    return await prisma.candidate.findUnique({
      where: { email: email },
    })
  if (role === UserRole.Employer)
    return await prisma.employer.findUnique({
      where: { email: email },
    })
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  email?: string | null,
  role?: UserRole
): Promise<CustomResponse> => {
  if (!role || !email) return { type: 'error', msg: 'Wrong session' }

  const user = await findUser(email, role as UserRole)

  if (!user) {
    return { type: 'error', msg: 'User not found' }
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) {
    return { type: 'error', msg: 'Incorrect password' }
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10)

  if (role === UserRole.Candidate) {
    await prisma.candidate.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })
  } else {
    await prisma.employer.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })
  }

  return { type: 'success', msg: 'Password changed successfully' }
}
