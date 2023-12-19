import { Card } from '@/components/atoms/Card'
import { InfoIcon } from '@/icons'
import { cn } from '@/lib/utils'
import { CandidateSelectorProps } from '.'

export const CandidateSelector = ({
  candidates,
  onCandidateSelect,
  selectedCandidateId,
  className,
}: CandidateSelectorProps) => {
  return (
    <Card
      className={cn(
        'p-3 flex flex-col gap-3 w-full lg:max-w-[300px]',
        className
      )}
    >
      {candidates.length ? (
        <>
          <h2>Select Candidate</h2>
          {/* <Search aria-label="Search Candidates" search="" /> */}
          <ul className="max-h-[300px] overflow-auto list-none">
            {candidates.map((candidate) => (
              <li
                key={candidate.id}
                className={cn(
                  'flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100',
                  { 'text-gold': candidate.id === selectedCandidateId }
                )}
                tabIndex={0}
                role="button"
                aria-pressed={candidate.id === selectedCandidateId}
                onClick={() => onCandidateSelect(candidate)}
              >
                <p className="max-w-[260px] truncate">{`${candidate.firstName} ${candidate.lastName}`}</p>
                <InfoIcon className="w-5 h-5" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No candidates found</p>
      )}
    </Card>
  )
}
