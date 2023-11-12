'use server'

import prisma from '@/lib/prisma'
import { CustomResponse } from '../../types'

export const updateCandidateProfile = async (
  data: {
    firstName?: string
    lastName?: string
    phone?: string
    description?: string
    githubUrl?: string
    portfolioUrl?: string
  },
  email?: string | null
): Promise<CustomResponse> => {
  try {
    if (!email) return { type: 'error', msg: 'Wrong session' }
    await prisma.candidate.update({
      where: { email: email },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        description: data.description,
        githubUrl: data.githubUrl,
        portfolioUrl: data.portfolioUrl,
      },
    })

    return { type: 'success', msg: 'Profile updated successfully' }
  } catch (error) {
    console.error(error)
    return { type: 'error', msg: 'Error updating profile' }
  }
}
