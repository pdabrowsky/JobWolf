import { Card } from '@/components/atoms/Card'
import { OfferHeaderProps } from '.'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CompanyIcon, LocationIcon } from '@/icons'
import { StarIcon } from 'lucide-react'

export const OfferHeader = ({
  city,
  companyName,
  logoUrl,
  title,
  className,
}: OfferHeaderProps) => {
  return (
    <Card className={cn('flex items-center gap-4 p-5 w-full', className)}>
      <div className="relative w-10 h-10 lg:w-20 lg:h-20">
        <Image
          src={logoUrl}
          alt={`${companyName} logo`}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 w-full max-w-[680px]">
        <div className="flex justify-between">
          <h1 className="text-[14px] lg:text-2xl font-semibold truncate pb-1">
            {title}
          </h1>
          <StarIcon
            className="w-5 h-5 lg:w-6 lg:h-6 text-gold cursor-pointer"
            aria-hidden="true"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <CompanyIcon className="w-6 h-6" aria-hidden="true" />
            <p className="text-[11px] lg:text-[15px] truncate">{companyName}</p>
          </div>
          <div className="flex gap-1 items-center">
            <LocationIcon className="w-6 h-6" aria-hidden="true" />
            <p className="text-[11px] lg:text-[15px] truncate">{city}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
