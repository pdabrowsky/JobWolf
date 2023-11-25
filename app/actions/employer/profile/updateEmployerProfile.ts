'use server'

import prisma from '@/lib/prisma'
import { CustomResponse } from '../../types'

export const updateEmployerProfile = async (
  data: {
    name?: string
    city?: string
    address?: string
    description?: string
    phone?: string
    website?: string
    logoName?: string
    logoUrl?: string
  },
  email?: string | null
): Promise<CustomResponse> => {
  try {
    if (!email) return { type: 'error', msg: 'Wrong session' }
    await prisma.employer.update({
      where: { email: email },
      data: {
        name: data.name,
        city: data.city,
        address: data.address,
        description: data.description,
        phone: data.phone,
        website: data.website,
        logoName: data.logoName,
        logoUrl: data.logoUrl,
      },
    })

    return { type: 'success', msg: 'Profile updated successfully' }
  } catch (error) {
    console.error(error)
    return { type: 'error', msg: 'Error updating profile' }
  }
}
