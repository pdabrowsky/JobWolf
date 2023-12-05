import prisma from '@/lib/prisma'

export const getOffers = async (query?: string) => {
  try {
    let whereCondition = {}

    if (query && query.trim() !== '') {
      whereCondition = {
        title: {
          contains: query,
        },
      }
    }

    const offers = await prisma.offer.findMany({
      where: whereCondition,
      include: {
        employer: true,
        experience: true,
        typeOfWork: true,
        operatingMode: true,
        mustHaveTech: true,
        niceToHaveTech: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return offers
  } catch (error) {
    console.error(error)
    return []
  }
}
