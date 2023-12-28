'use server'

import prisma from '@/lib/prisma'
import { CandidateProfileData, CandidateProfileResponse } from './types'

export const getCandidateProfile = async (
  email: string
): Promise<CandidateProfileResponse> => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { email: email },
    })

    if (!candidate) return {}

    const profileData: CandidateProfileData = {
      firstName: candidate.firstName || '',
      lastName: candidate.lastName || '',
      phone: candidate.phone || '',
      description: candidate.description || '',
      githubUrl: candidate.githubUrl || '',
      portfolioUrl: candidate.portfolioUrl || '',
      fileName: candidate.fileName || '',
      fileUrl: candidate.fileUrl || '',
    }

    return {
      data: profileData,
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}
