/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const orConditions: Record<string, any>[] = []

  const addOrCondition = (
    filterArray: number[],
    fieldName: string,
    isRelation: boolean = false
  ) => {
    if (filterArray.length > 0) {
      const condition: Record<string, any> = {}
      if (isRelation) {
        condition[fieldName] = { some: { contractTypeId: { in: filterArray } } }
      } else {
        condition[fieldName] = { in: filterArray }
      }
      orConditions.push(condition)
    }
  }

  addOrCondition(filters.contractType, 'salaryRanges', true)
  addOrCondition(filters.experience, 'experienceId')
  addOrCondition(filters.typeOfWork, 'typeOfWorkId')
  addOrCondition(filters.operatingMode, 'operatingModeId')

  if (orConditions.length > 0) {
    whereCondition.AND.push({ OR: orConditions })
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

  if (filters.salaryFrom !== undefined || filters.salaryTo !== undefined) {
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
  AND: Array<Record<string, any>>
  isOpen?: boolean
  salaryRanges?: {
    some: {
      AND?: Array<Record<string, any>>
      contractTypeId?: {
        in: number[]
      }
    }
  }
}
