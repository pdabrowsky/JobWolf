import { Card } from '@/components/atoms/Card'
import {
  CandidateDetailsProps,
  CandidateDetailsSectionProps,
} from './CandidateDetails.types'
import { cn } from '@/lib/utils'
import { getDownloadUrl } from '@edgestore/react/utils'
import { LinkWithCopy } from '@/components/atoms/LinkWithCopy'
import { DownloadIcon } from '@/icons'

const DetailSection = ({ title, children }: CandidateDetailsSectionProps) => {
  return (
    <div className="flex flex-col mb-4 gap-2">
      <p className="font-semibold text-lg">{title}</p>
      {children}
    </div>
  )
}

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
      <DetailSection title="Contact info">
        <p className="text-sm truncate">{candidate.phone}</p>
        <a href={`mailto:${candidate.email}`} className="text-sm w-fit">
          {candidate.email}
        </a>
      </DetailSection>
      <DetailSection title="About candidate">
        <p className="text-sm">{candidate.description}</p>
      </DetailSection>
      {(candidate.portfolioUrl || candidate.githubUrl) && (
        <DetailSection title="Links">
          {candidate.portfolioUrl && (
            <LinkWithCopy href={candidate.portfolioUrl} />
          )}
          {candidate.githubUrl && <LinkWithCopy href={candidate.githubUrl} />}
        </DetailSection>
      )}
      {candidate.fileUrl && (
        <DetailSection title="Attached file">
          <a
            href={getDownloadUrl(
              candidate.fileUrl,
              candidate.fileName || 'file'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-fit text-sm"
          >
            {candidate.fileName}
            {<DownloadIcon className="w-5 h-5 ml-2" />}
          </a>
        </DetailSection>
      )}
    </Card>
  )
}
