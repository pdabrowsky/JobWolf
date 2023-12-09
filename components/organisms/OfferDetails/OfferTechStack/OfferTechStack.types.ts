import { OfferDetailsProps } from '..'

export type OfferTechStackProps = Pick<
  OfferDetailsProps,
  'mustHaveTech' | 'niceToHaveTech'
>
