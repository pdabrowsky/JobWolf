import prisma from '@/lib/prisma'

export const getFavoriteOffers = async (candidateEmail: string) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { email: candidateEmail },
    })

    if (!candidate) {
      return []
    }

    const favoriteOffers = await prisma.favoriteOffer.findMany({
      where: {
        candidateId: candidate.id,
      },
      include: {
        offer: {
          include: {
            employer: {
              select: {
                logoUrl: true,
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
        },
      },
    })

    return favoriteOffers.map(({ offer }) => {
      const firstSalaryRange =
        offer.salaryRanges.length > 0 ? offer.salaryRanges[0] : null

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
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
