import { CandidateInfo } from '..'

export type CandidateDetailsProps = {
  candidate: CandidateInfo
  className?: string
}

export type CandidateDetailsSectionProps = {
  title: string
  children: React.ReactNode
}
