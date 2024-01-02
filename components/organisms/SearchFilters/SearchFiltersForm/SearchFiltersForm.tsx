import { Button } from '@/components/atoms/Button'
import { TextField } from '@/components/atoms/TextField'
import { TechSelector } from '@/components/molecules/TechSelector'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSearchParams, useRouter } from 'next/navigation'
import queryString from 'query-string'
import { SearchFiltersFormProps } from './SearchFiltersForm.types'
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup'
import { transformQueryParamToArray } from './SearchFiltersForm.helpers'

const PostJobSchema = z
  .object({
    salaryFrom: z.number().min(0).optional(),
    salaryTo: z.number().min(0).optional(),
    techStack: z.array(z.number()),
    contractType: z.array(z.number()),
    experience: z.array(z.number()),
    typeOfWork: z.array(z.number()),
    operatingMode: z.array(z.number()),
  })
  .refine(
    (data) =>
      data.salaryFrom === undefined ||
      data.salaryTo === undefined ||
      data.salaryFrom <= data.salaryTo,
    {
      message: 'Salary from must not be greater than salary to',
      path: ['salaryFrom'],
    }
  )

type SearchFilters = z.infer<typeof PostJobSchema>

export const SearchFiltersForm = ({
  onClose,
  filterOptions,
}: SearchFiltersFormProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const parsedQuery = queryString.parse(searchParams.toString())

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SearchFilters>({
    resolver: zodResolver(PostJobSchema),
    defaultValues: {
      salaryFrom: Number(parsedQuery.salaryFrom) || undefined,
      salaryTo: Number(parsedQuery.salaryTo) || undefined,
      techStack: transformQueryParamToArray(parsedQuery.techStack),
      experience: transformQueryParamToArray(parsedQuery.experience),
      typeOfWork: transformQueryParamToArray(parsedQuery.typeOfWork),
      contractType: transformQueryParamToArray(parsedQuery.contractType),
      operatingMode: transformQueryParamToArray(parsedQuery.operatingMode),
    },
  })

  const onReset = () => {
    setValue('salaryFrom', undefined)
    setValue('salaryTo', undefined)
    reset({
      techStack: [],
      experience: [],
      typeOfWork: [],
      contractType: [],
      operatingMode: [],
    })
  }

  const onSubmit: SubmitHandler<SearchFilters> = async (data) => {
    const search = searchParams.get('search')

    const stringifiedParams = queryString.stringify({
      ...data,
      ...(search && { search }),
    })

    router.push(`?${stringifiedParams}`)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:gap-3">
        <TextField
          label="Salary from"
          type="number"
          errors={errors}
          {...register('salaryFrom', {
            setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
          })}
        />
        <TextField
          label="Salary to"
          type="number"
          errors={errors}
          {...register('salaryTo', {
            setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
          })}
        />
      </div>
      <Controller
        name="techStack"
        control={control}
        render={({ field }) => (
          <TechSelector
            label="Technology stack"
            name={field.name}
            selectedTechs={field.value}
            onChange={(selected) => field.onChange(selected)}
            technologies={filterOptions.technology}
            errors={errors}
          />
        )}
      />
      <Controller
        name="contractType"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            name={field.name}
            label="Type of employment"
            options={filterOptions.contractType}
            control={control}
          />
        )}
      />
      <Controller
        name="experience"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            name={field.name}
            label="Experience"
            options={filterOptions.experience}
            control={control}
          />
        )}
      />
      <Controller
        name="typeOfWork"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            name={field.name}
            label="Type of work"
            options={filterOptions.typeOfWork}
            control={control}
          />
        )}
      />
      <Controller
        name="operatingMode"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            name={field.name}
            label="Operating mode"
            options={filterOptions.operatingMode}
            control={control}
          />
        )}
      />
      <Button type="submit" className="mx-auto mt-6 font-semibold px-8">
        Apply
      </Button>
      <button
        className="text-gold absolute top-4 left-20 p-1.5 text-sm"
        type="button"
        onClick={onReset}
      >
        Clear Filters
      </button>
    </form>
  )
}
