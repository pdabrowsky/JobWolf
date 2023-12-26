import prisma from '@/lib/prisma'

type FilterOptions = {
  contractType: number[]
  technology: number[]
  operatingMode: number[]
  typeOfWork: number[]
  experience: number[]
  salaryFrom?: number
  salaryTo?: number
}

type WhereCondition = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OR?: Array<Record<string, any>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AND?: Array<Record<string, any>>
  salaryRanges?: {
    some: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      AND?: Array<Record<string, any>>
      contractTypeId?: {
        in: number[]
      }
    }
  }
}

export const getOfferList = async (
  query: string = '',
  page: number = 1,
  filters: FilterOptions = {
    contractType: [],
    technology: [],
    operatingMode: [],
    typeOfWork: [],
    experience: [],
  }
) => {
  try {
    const whereCondition: WhereCondition = buildWhereCondition(query, filters)

    const pageSize = 10

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

    const totalOffers = await prisma.offer.count({ where: whereCondition })

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
            : undefined,
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

function buildWhereCondition(
  query: string,
  filters: FilterOptions
): WhereCondition {
  const whereCondition: WhereCondition = {}

  if (query.trim() !== '') {
    whereCondition.AND = whereCondition.AND || []
    whereCondition.AND.push({ title: { contains: query } })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditionArrays: Array<Record<string, any>> = [
    filters.contractType.length > 0
      ? [
          {
            salaryRanges: {
              some: { contractTypeId: { in: filters.contractType } },
            },
          },
        ]
      : [],
    filters.technology.length > 0
      ? [
          {
            OR: [
              { mustHaveTech: { some: { id: { in: filters.technology } } } },
              {
                niceToHaveTech: { some: { id: { in: filters.technology } } },
              },
            ],
          },
        ]
      : [],
    filters.experience.map((id) => ({ experienceId: id })),
    filters.typeOfWork.map((id) => ({ typeOfWorkId: id })),
    filters.operatingMode.map((id) => ({ operatingModeId: id })),
  ]

  if (filters.salaryFrom !== undefined || filters.salaryTo !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const salaryRangeCondition: Record<string, any> = {}
    if (filters.salaryFrom !== undefined) {
      salaryRangeCondition.salaryFrom = { gte: filters.salaryFrom }
    }
    if (filters.salaryTo !== undefined) {
      salaryRangeCondition.salaryTo = { lte: filters.salaryTo }
    }

    conditionArrays.push({
      salaryRanges: {
        some: {
          AND: [salaryRangeCondition],
          ...(filters.contractType.length > 0 && {
            contractTypeId: { in: filters.contractType },
          }),
        },
      },
    })
  }

  const combinedConditions = conditionArrays
    .flat()
    .filter((condition) => Object.keys(condition).length > 0)

  if (combinedConditions.length > 0) {
    whereCondition.OR = combinedConditions
  }

  return whereCondition
}
