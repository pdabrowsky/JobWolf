'use server'

import { OfferData } from '@/components/molecules/OfferPostedList'
import prisma from '@/lib/prisma'

export const getEmployerOffers = async (
  employerEmail: string,
  page: number = 1
): Promise<OfferData> => {
  const pageSize = 10

  const skip = (page - 1) * pageSize

  try {
    const employer = await prisma.employer.findUnique({
      where: { email: employerEmail },
    })

    if (!employer) {
      return { offers: [], hasNextPage: false }
    }

    const offers = await prisma.offer.findMany({
      where: {
        employerId: employer.id,
      },
      skip: skip,
      take: pageSize,
      include: {
        employer: {
          select: {
            companyName: true,
            logoUrl: true,
          },
        },
        mustHaveTech: {
          select: {
            id: true,
            name: true,
          },
        },
        niceToHaveTech: {
          select: {
            id: true,
            name: true,
          },
        },
        salaryRanges: {
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
    })

    const totalOffers = await prisma.offer.count()

    const hasNextPage = skip + offers.length < totalOffers

    return {
      offers: offers.map((offer) => {
        const firstSalaryRange =
          offer.salaryRanges.length > 0 ? offer.salaryRanges[0] : null

        return {
          id: offer.id,
          title: offer.title,
          description: offer.description,
          technologies: offer.mustHaveTech.map((tech) => tech.name),
          companyName: offer.employer.companyName || '',
          employerLogoUrl: offer.employer.logoUrl || '',
          isOpen: offer.isOpen,
          salaryRange: firstSalaryRange
            ? {
                salaryFrom: firstSalaryRange.salaryFrom,
                salaryTo: firstSalaryRange.salaryTo,
                contractTypeName: firstSalaryRange.contractType?.name,
              }
            : undefined,
        }
      }),
      hasNextPage,
    }
  } catch (error) {
    console.error(error)
    return { offers: [], hasNextPage: false }
  }
}
