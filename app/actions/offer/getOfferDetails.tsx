'use server'

import { OfferDetailsProps } from '@/components/organisms/OfferDetails'
import prisma from '@/lib/prisma'

export const getOfferDetails = async (
  id: string,
  candidateEmail?: string | null
): Promise<OfferDetailsProps | null> => {
  try {
    let isAddedToFavourites = false
    let hasApplied = false

    if (candidateEmail) {
      const favorite = await prisma.favoriteOffer.findFirst({
        where: {
          offerId: id,
          candidate: {
            email: candidateEmail,
          },
        },
      })
      isAddedToFavourites = !!favorite

      const application = await prisma.application.findFirst({
        where: {
          offerId: id,
          candidate: {
            email: candidateEmail,
          },
        },
      })
      hasApplied = !!application
    }

    const offer = await prisma.offer.findUnique({
      where: { id },
      include: {
        employer: true,
        experience: true,
        typeOfWork: true,
        operatingMode: true,
        mustHaveTech: true,
        niceToHaveTech: true,
        salaryRanges: {
          include: {
            contractType: true,
          },
        },
      },
    })

    if (!offer || !offer.employer) return null

    return {
      ...offer,
      isAddedToFavourites,
      hasApplied,
      salaryRanges: offer.salaryRanges.map((salaryRange) => ({
        salaryFrom: salaryRange.salaryFrom,
        salaryTo: salaryRange.salaryTo,
        contractType: salaryRange.contractType?.name,
      })),
      employer: {
        ...offer.employer,
        name: offer.employer.companyName || '',
        city: offer.employer.city || '',
        address: offer.employer.address || '',
        description: offer.employer.description || '',
        phone: offer.employer.phone || '',
        website: offer.employer.website || '',
        logoName: offer.employer.logoName || '',
        logoUrl: offer.employer.logoUrl || '',
      },
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
