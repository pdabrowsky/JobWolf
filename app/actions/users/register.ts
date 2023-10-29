'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const register = async (
  email: string,
  password: string,
  role: 'candidate' | 'employer'
) => {
  if (role === 'candidate') {
    const candidate = await prisma.candidate.findUnique({ where: { email } })
    if (candidate) return 'Candidate already exists'

    const passwordHash = bcrypt.hashSync(password, 10)

    await prisma.candidate.create({
      data: {
        email,
        password: passwordHash,
      },
    })
  } else {
    const employer = await prisma.employer.findUnique({ where: { email } })
    if (employer) return 'Employer already exists'

    const passwordHash = bcrypt.hashSync(password, 10)

    await prisma.employer.create({
      data: {
        email,
        password: passwordHash,
      },
    })
  }

  return 'Success'
}
