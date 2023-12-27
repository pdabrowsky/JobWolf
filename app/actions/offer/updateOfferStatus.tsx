'use server'

import prisma from '@/lib/prisma'
import { CustomResponse } from '../types'

export const updateOfferStatus = async (
  offerId: string,
  newStatus: boolean
): Promise<CustomResponse> => {
  try {
    const offer = await prisma.offer.findUnique({ where: { id: offerId } })
    if (!offer) {
      return { type: 'error', msg: 'Offer does not exist' }
    }

    await prisma.offer.update({
      where: { id: offerId },
      data: { isOpen: newStatus },
    })

    return { type: 'success', msg: 'Offer status updated successfully' }
  } catch (error) {
    console.error(error)
    return { type: 'error', msg: 'Error updating offer status' }
  }
}
