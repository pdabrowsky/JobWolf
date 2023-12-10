import prisma from '@/lib/prisma'

export const getEmployerOffers = async (employerEmail: string) => {
  try {
    const employer = await prisma.employer.findUnique({
      where: { email: employerEmail },
    })

    if (!employer) {
      return []
    }

    const offers = await prisma.offer.findMany({
      where: {
        employerId: employer.id,
      },
      include: {
        employer: {
          select: {
            name: true,
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
      },
    })

    return offers.map((offer) => ({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      technologies: offer.mustHaveTech.map((tech) => tech.name),
      companyName: offer.employer.name || '',
      employerLogoUrl: offer.employer.logoUrl || '',
      isOpen: offer.isOpen,
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
