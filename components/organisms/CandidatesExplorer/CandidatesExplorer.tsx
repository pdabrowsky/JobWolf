'use client'

import React, { useState } from 'react'
import { CandidateInfo, CandidatesExplorerProps } from '.'
import { CandidateSelector } from './CandidateSelector'
import { CandidateDetails } from './CandidateDetails'

export const CandidatesExplorer = ({ candidates }: CandidatesExplorerProps) => {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0])
  const handleCandidateSelect = (candidate: CandidateInfo) => {
    setSelectedCandidate(candidate)
  }

  return (
    <div className="w-[800px] flex gap-4">
      <CandidateSelector
        candidates={candidates}
        onCandidateSelect={handleCandidateSelect}
        selectedCandidateId={selectedCandidate?.id}
      />
      <CandidateDetails candidate={selectedCandidate} />
    </div>
  )
}
