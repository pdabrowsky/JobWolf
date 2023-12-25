'use client'

import Link from 'next/link'
import { Card } from '../Card'
import { OfferCardProps } from './OfferCard.types'
import Image from 'next/image'
import { TechItem } from '../TechItem'

export const OfferCard = ({
  id,
  title,
  companyName,
  employerLogoUrl,
  salaryRange,
  technologies,
}: OfferCardProps) => {
  return (
    <li className="w-full">
      <Link href={`/offer?id=${id}`} className="w-full">
        <Card className="flex justify-between gap-4 items-center p-4 w-full">
          <div className="flex items-center">
            <div className="relative w-10 h-10 lg:w-14 lg:h-14">
              <Image
                src={employerLogoUrl}
                alt={`${companyName} logo`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="ml-4 max-w-fit">
              <p className="text-[13px] lg:text-lg font-semibold truncate pb-1">
                {title}
              </p>
              <p className="text-[11px] lg:text-[15px] truncate">
                {companyName}
              </p>
            </div>
          </div>
          <div className="flex-col items-end hidden md:flex gap-1">
            <div>
              {salaryRange ? (
                // TODO remove this
                <p className="font-semibold text-lg">
                  {salaryRange.salaryFrom} - {salaryRange.salaryTo} PLN
                </p>
              ) : (
                <p className="font-semibold text-lg">N/A</p>
              )}
            </div>
            <div className="flex gap-2">
              {technologies.slice(0, 3).map((tech, index) => (
                <TechItem key={index} name={tech} variant="gold" />
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </li>
  )
}
