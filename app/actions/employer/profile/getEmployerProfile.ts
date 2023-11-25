'use server'

import prisma from '@/lib/prisma'
import { EmployerProfileData, EmployerProfileResponse } from './types'

export const getEmployerProfile = async (
  email: string
): Promise<EmployerProfileResponse> => {
  try {
    const employer = await prisma.employer.findUnique({
      where: { email: email },
    })

    if (!employer) return {}

    const profileData: EmployerProfileData = {
      name: employer.name || '',
      city: employer.city || '',
      address: employer.address || '',
      description: employer.description || '',
      phone: employer.phone || '',
      website: employer.website || '',
      logoName: employer.logoName || '',
      logoUrl: employer.logoUrl || '',
    }

    return {
      data: profileData,
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}
