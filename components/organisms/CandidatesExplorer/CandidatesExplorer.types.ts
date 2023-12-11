export type CandidatesExplorerProps = {
  candidates: CandidateInfo[]
}

export type CandidateInfo = {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  phone: string | null
  description: string | null
  githubUrl: string | null
  portfolioUrl: string | null
  fileName: string | null
  fileUrl: string | null
}
