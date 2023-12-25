import { CheckboxOption } from '@/components/molecules/CheckboxGroup'
import { FilterOptionsSet } from '@/components/organisms/SearchFilters/SearchFiltersForm/SearchFiltersForm.types'
import prisma from '@/lib/prisma'

export const getFilterOptions = async (): Promise<FilterOptionsSet> => {
  try {
    const [experience, typeOfWork, operatingMode, technology, contractType] =
      await Promise.all([
        prisma.experience.findMany({ select: { id: true, name: true } }),
        prisma.typeOfWork.findMany({ select: { id: true, name: true } }),
        prisma.operatingMode.findMany({ select: { id: true, name: true } }),
        prisma.technology.findMany({ select: { id: true, name: true } }),
        prisma.contractType.findMany({ select: { id: true, name: true } }),
      ])

    const mapToOptions = (
      items: { id: number; name: string }[]
    ): CheckboxOption[] =>
      items.map((item) => ({ value: item.id, label: item.name }))

    return {
      experienceOptions: mapToOptions(experience),
      typeOfWorkOptions: mapToOptions(typeOfWork),
      operatingModeOptions: mapToOptions(operatingMode),
      technologyOptions: mapToOptions(technology),
      contractTypeOptions: mapToOptions(contractType),
    }
  } catch (error) {
    console.error(error)
    return {
      experienceOptions: [],
      typeOfWorkOptions: [],
      operatingModeOptions: [],
      technologyOptions: [],
      contractTypeOptions: [],
    }
  }
}
