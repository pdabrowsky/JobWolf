import prisma from '@/lib/prisma'

export const getOfferList = async (
  query?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    let whereCondition = {}

    if (query && query.trim() !== '') {
      whereCondition = {
        title: {
          contains: query,
        },
      }
    }

    const skip = (page - 1) * pageSize

    const offers = await prisma.offer.findMany({
      where: whereCondition,
      skip: skip,
      take: pageSize,
      include: {
        employer: {
          select: {
            logoUrl: true,
            logoName: true,
            companyName: true,
          },
        },
        mustHaveTech: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return offers.map((offer) => {
      return {
        id: offer.id,
        title: offer.title,
        technologies: offer.mustHaveTech.map((tech) => tech.name),
        companyName: offer.employer.companyName || '',
        employerLogoUrl: offer.employer.logoUrl || '',
      }
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
