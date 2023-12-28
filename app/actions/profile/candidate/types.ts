export type CandidateProfileResponse = {
  data?: CandidateProfileData
}

export type CandidateProfileData = {
  firstName: string
  lastName: string
  phone: string
  description: string
  githubUrl: string
  portfolioUrl: string
  fileName: string
  fileUrl: string
}
