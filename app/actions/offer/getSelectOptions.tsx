'use server'

import { CheckboxOption } from '@/components/molecules/CheckboxGroup'
import { FilterOptionsSet } from '@/components/organisms/SearchFilters/SearchFiltersForm/SearchFiltersForm.types'
import prisma from '@/lib/prisma'

export const getSelectOptions = async (): Promise<FilterOptionsSet> => {
  try {
    const [
      operatingModes,
      experiences,
      typesOfWork,
      techOptions,
      contractTypes,
    ] = await Promise.all([
      prisma.operatingMode.findMany({ orderBy: { id: 'asc' } }),
      prisma.experience.findMany({ orderBy: { id: 'asc' } }),
      prisma.typeOfWork.findMany({ orderBy: { id: 'asc' } }),
      prisma.technology.findMany({ orderBy: { id: 'asc' } }),
      prisma.contractType.findMany({ orderBy: { id: 'asc' } }),
    ])

    const mapToOptions = (
      items: { id: number; name: string }[]
    ): CheckboxOption[] =>
      items.map((item) => ({ value: item.id, label: item.name }))

    return {
      operatingMode: mapToOptions(operatingModes),
      experience: mapToOptions(experiences),
      typeOfWork: mapToOptions(typesOfWork),
      technology: mapToOptions(techOptions),
      contractType: mapToOptions(contractTypes),
    }
  } catch (error) {
    console.error(error)
    return {
      operatingMode: [],
      experience: [],
      typeOfWork: [],
      technology: [],
      contractType: [],
    }
  }
}
