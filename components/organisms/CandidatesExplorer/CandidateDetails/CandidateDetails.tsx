import { Card } from '@/components/atoms/Card'
import { CandidateDetailsProps } from './CandidateDetails.types'
import { cn } from '@/lib/utils'

export const CandidateDetails = ({
  candidate,
  className,
}: CandidateDetailsProps) => {
  return (
    <Card className={cn('p-3 flex flex-col gap-3 w-full', className)}>
      <h2 className="mb-2">Candidate details</h2>

      <strong className="text-gold text-xl">
        {candidate.firstName} {candidate.lastName}
      </strong>
      <p className="font-semibold text-lg">Contact info</p>
      <div className="flex gap-2">
        <p className="font-semibold text-sm">{candidate.phone}</p>
        <p className="font-semibold text-sm">{candidate.email}</p>
      </div>
      <p className="font-semibold text-lg">About candidate</p>
      <p className="text-sm">{candidate.description}</p>
      <p className="font-semibold text-lg">Attached file</p>
      <p className="text-sm">{candidate.fileName}</p>
    </Card>
  )
}
