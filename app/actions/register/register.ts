'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { RegisterResponse, UserRole } from '.'

export const register = async (
  email: string,
  password: string,
  role: UserRole
): Promise<RegisterResponse> => {
  const candidate = await prisma.candidate.findUnique({ where: { email } })
  const employer = await prisma.employer.findUnique({ where: { email } })

  if (candidate || employer)
    return { type: 'error', msg: 'An account with this email already exists' }

  const passwordHash = bcrypt.hashSync(password, 10)

  if (role === 'candidate') {
    await prisma.candidate.create({
      data: {
        email,
        password: passwordHash,
      },
    })
  } else {
    await prisma.employer.create({
      data: {
        email,
        password: passwordHash,
      },
    })
  }

  return { type: 'success', msg: 'Account created successfully!' }
}
