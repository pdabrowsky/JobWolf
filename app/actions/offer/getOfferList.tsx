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
        salaryRanges: {
          take: 1,
          select: {
            salaryFrom: true,
            salaryTo: true,
            contractType: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const totalOffers = await prisma.offer.count({
      where: whereCondition,
    })

    const hasNextPage = skip + offers.length < totalOffers

    return {
      offers: offers.map((offer) => {
        const firstSalaryRange = offer.salaryRanges[0] || null
        return {
          id: offer.id,
          title: offer.title,
          technologies: offer.mustHaveTech.map((tech) => tech.name),
          companyName: offer.employer.companyName || '',
          employerLogoUrl: offer.employer.logoUrl || '',
          salaryRange: firstSalaryRange
            ? {
                salaryFrom: firstSalaryRange.salaryFrom,
                salaryTo: firstSalaryRange.salaryTo,
                contractTypeName: firstSalaryRange.contractType?.name,
              }
            : null,
        }
      }),
      totalOffers,
      hasNextPage,
    }
  } catch (error) {
    console.error(error)
    return {
      offers: [],
      totalOffers: 0,
      hasNextPage: false,
    }
  }
}
