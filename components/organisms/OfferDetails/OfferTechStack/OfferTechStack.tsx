import { Card } from '@/components/atoms/Card'
import { OfferTechStackProps } from './OfferTechStack.types'
import { TechItem } from '@/components/atoms/TechItem'

export const OfferTechStack = ({
  mustHaveTech,
  niceToHaveTech,
}: OfferTechStackProps) => {
  return (
    <Card className="p-5 flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Must Have Technologies</h3>
        <div className="flex flex-wrap gap-3">
          {mustHaveTech.map((tech) => (
            <TechItem key={tech.id} name={tech.name} variant="gold" />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Nice to Have Technologies
        </h3>
        <div className="flex flex-wrap gap-3">
          {niceToHaveTech.map((tech) => (
            <TechItem key={tech.id} name={tech.name} variant="gold" />
          ))}
        </div>
      </div>
    </Card>
  )
}
