'use server'

import prisma from '@/lib/prisma'

export const getOfferCandidates = async (
  offerId: string,
  candidateName?: string
) => {
  try {
    const whereClause: {
      offerId: string
      candidate?: {
        OR: Array<{
          firstName?: {
            contains: string
          }
          lastName?: {
            contains: string
          }
        }>
      }
    } = {
      offerId: offerId,
    }

    if (candidateName) {
      whereClause.candidate = {
        OR: [
          {
            firstName: {
              contains: candidateName,
            },
          },
          {
            lastName: {
              contains: candidateName,
            },
          },
        ],
      }
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        candidate: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            description: true,
            githubUrl: true,
            portfolioUrl: true,
            fileName: true,
            fileUrl: true,
          },
        },
      },
    })

    return applications.map((application) => ({
      id: application.candidate.id,
      firstName: application.candidate.firstName,
      lastName: application.candidate.lastName,
      email: application.candidate.email,
      phone: application.candidate.phone,
      description: application.candidate.description,
      githubUrl: application.candidate.githubUrl,
      portfolioUrl: application.candidate.portfolioUrl,
      fileName: application.candidate.fileName,
      fileUrl: application.candidate.fileUrl,
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
