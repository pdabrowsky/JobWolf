'use server'

import prisma from '@/lib/prisma'

export const getOfferList = async (
  query: string = '',
  page: number = 1,
  filters: FilterOptions = {
    contractType: [],
    technology: [],
    operatingMode: [],
    typeOfWork: [],
    experience: [],
  },
  employerEmail?: string | false
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
            email: true,
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
        const isPostedByMe = employerEmail
          ? offer.employer.email === employerEmail
          : false

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
          isPostedByMe: isPostedByMe,
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
  const whereCondition: WhereCondition = { AND: [], isOpen: true }

  if (query.trim() !== '') {
    whereCondition.AND.push({ title: { contains: query } })
  }

  if (filters.contractType.length > 0) {
    whereCondition.AND.push({
      salaryRanges: { some: { contractTypeId: { in: filters.contractType } } },
    })
  }

  if (filters.technology.length > 0) {
    filters.technology.forEach((techId) => {
      whereCondition.AND.push({
        OR: [
          { mustHaveTech: { some: { id: techId } } },
          { niceToHaveTech: { some: { id: techId } } },
        ],
      })
    })
  }

  filters.experience.forEach((id) =>
    whereCondition.AND.push({ experienceId: id })
  )
  filters.typeOfWork.forEach((id) =>
    whereCondition.AND.push({ typeOfWorkId: id })
  )
  filters.operatingMode.forEach((id) =>
    whereCondition.AND.push({ operatingModeId: id })
  )

  if (filters.salaryFrom !== undefined || filters.salaryTo !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const salaryRangeCondition: Record<string, any> = {}
    if (filters.salaryFrom !== undefined) {
      salaryRangeCondition.salaryFrom = { gte: filters.salaryFrom }
    }
    if (filters.salaryTo !== undefined) {
      salaryRangeCondition.salaryTo = { lte: filters.salaryTo }
    }

    whereCondition.AND.push({
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

  return whereCondition
}

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
  AND: Array<Record<string, any>>
  isOpen?: boolean
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
