import { OfferDetailsProps } from '@/components/organisms/OfferDetails'
import prisma from '@/lib/prisma'

export const getOffer = async (
  id: string
): Promise<OfferDetailsProps | null> => {
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: id },
      include: {
        employer: true,
        experience: true,
        typeOfWork: true,
        operatingMode: true,
        mustHaveTech: true,
        niceToHaveTech: true,
      },
    })

    if (!offer || !offer.employer) return null

    return {
      ...offer,
      employer: {
        ...offer.employer,
        name: offer.employer.name || '',
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
