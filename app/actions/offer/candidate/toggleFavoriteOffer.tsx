'use server'

import prisma from '@/lib/prisma'
import { CustomResponse } from '../../types'

export const toggleFavoriteOffer = async (favoriteData: {
  candidateEmail: string
  offerId: string
}): Promise<CustomResponse> => {
  try {
    const { candidateEmail, offerId } = favoriteData

    // Check if the offer exists
    const offer = await prisma.offer.findUnique({ where: { id: offerId } })
    if (!offer) {
      return { type: 'error', msg: 'Offer does not exist' }
    }

    // Check if the candidate exists
    const candidate = await prisma.candidate.findUnique({
      where: { email: candidateEmail },
    })
    if (!candidate) {
      return { type: 'error', msg: 'Candidate not found' }
    }

    // Check if the offer is already in the candidate's favorites
    const existingFavorite = await prisma.favoriteOffer.findFirst({
      where: {
        candidateId: candidate.id,
        offerId: offerId,
      },
    })

    if (existingFavorite) {
      // Remove the offer from the candidate's favorites
      await prisma.favoriteOffer.delete({
        where: {
          candidateId_offerId: {
            candidateId: candidate.id,
            offerId: offerId,
          },
        },
      })
      return { type: 'success', msg: 'Offer removed from favorites' }
    } else {
      // Add the offer to the candidate's favorites
      await prisma.favoriteOffer.create({
        data: {
          candidateId: candidate.id,
          offerId: offerId,
        },
      })
      return { type: 'success', msg: 'Offer added to favorites' }
    }
  } catch (error) {
    console.error(error)
    return { type: 'error', msg: 'Error toggling favorite offer' }
  }
}
