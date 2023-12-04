'use server'

import prisma from '@/lib/prisma'
import { CustomResponse } from '../types'

export const postOffer = async (
  email: string,
  data: {
    title: string
    description: string
    operatingMode: number
    experience: number
    typeOfWork: number
    mustHaveTechs: number[]
    niceToHaveTechs: number[]
  }
): Promise<CustomResponse> => {
  const user = await prisma.employer.findUnique({
    where: { email: email },
  })

  if (!user) return { type: 'error', msg: 'User not found' }

  try {
    await prisma.offer.create({
      data: {
        title: data.title,
        description: data.description,
        operatingModeId: data.operatingMode,
        experienceId: data.experience,
        typeOfWorkId: data.typeOfWork,
        city: user.city ?? '',
        employerId: user.id,
        mustHaveTech: {
          connect: data.mustHaveTechs.map((id) => ({ id })),
        },
        niceToHaveTech: {
          connect: data.niceToHaveTechs.map((id) => ({ id })),
        },
      },
    })

    return {
      type: 'success',
      msg: 'Offer created successfully',
    }
  } catch (error) {
    console.error(error)
    return { type: 'error', msg: 'Failed to create offer' }
  }
}
