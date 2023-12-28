'use server'

import prisma from '@/lib/prisma'
import { CustomResponse } from '../../types'

export const applyForOffer = async (applicationData: {
  candidateEmail: string
  offerId: string
}): Promise<CustomResponse> => {
  try {
    const { candidateEmail, offerId } = applicationData

    const offer = await prisma.offer.findUnique({ where: { id: offerId } })
    if (!offer || !offer.isOpen) {
      return { type: 'error', msg: 'Offer is not open or does not exist' }
    }

    const candidate = await prisma.candidate.findUnique({
      where: { email: candidateEmail },
    })
    if (!candidate) {
      return { type: 'error', msg: 'Candidate not found' }
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        candidateId: candidate.id,
        offerId: offerId,
      },
    })
    if (existingApplication) {
      return { type: 'error', msg: 'You have already applied for this offer' }
    }

    await prisma.application.create({
      data: {
        candidateId: candidate.id,
        offerId: offerId,
        candidateFirstName: candidate.firstName,
        candidateLastName: candidate.lastName,
        candidatePhone: candidate.phone,
        candidateDescription: candidate.description,
        candidateGithubUrl: candidate.githubUrl,
        candidatePortfolioUrl: candidate.portfolioUrl,
        candidateFileName: candidate.fileName,
        candidateFileUrl: candidate.fileUrl,
      },
    })

    return { type: 'success', msg: 'Application submitted' }
  } catch (error) {
    console.error(error)
    return { type: 'error', msg: 'Error submitting application' }
  }
}
