import { CandidateInfo } from '..'

export type CandidateSelectorProps = {
  candidates: CandidateInfo[]
  onCandidateSelect: (candidate: CandidateInfo) => void
  selectedCandidateId: string
  className?: string
}
