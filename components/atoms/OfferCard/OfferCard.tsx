'use client'

import Link from 'next/link'
import { Card } from '../Card'
import { OfferCardProps } from './OfferCard.types'
import Image from 'next/image'

export const OfferCard = ({
  id,
  title,
  companyName,
  employerLogoUrl,
  technologies,
}: OfferCardProps) => {
  return (
    <Link href={`/offer?id=${id}`}>
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
            <p className="text-[14px] lg:text-lg font-semibold truncate">
              {title}
            </p>
            <p className="text-[12px] lg:text-[15px] truncate">{companyName}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div>
            <p className="font-semibold text-lg">1000 - 3000 PLN</p>
          </div>
          <div className="flex">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gold text-sm text-black px-2 py-1 rounded-lg mr-2 last:mr-0"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}
