import { Button } from '@/components/atoms/Button'
import { TextField } from '@/components/atoms/TextField'
import { TechSelector } from '@/components/molecules/TechSelector'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSearchParams, useRouter } from 'next/navigation'
import queryString from 'query-string'

const PostJobSchema = z.object({
  salaryFrom: z.number(),
  salaryTo: z.number(),
  techStack: z.array(z.number()),
})

type Filters = {
  techStack?: number[]
  salaryFrom?: number
  salaryTo?: number
}

type SearchFilters = z.infer<typeof PostJobSchema>

export const SearchFiltersForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const parsedQuery = queryString.parse(searchParams.toString())

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchFilters>({
    resolver: zodResolver(PostJobSchema),
    defaultValues: {
      salaryFrom: Number(parsedQuery.salaryFrom) || undefined,
      salaryTo: Number(parsedQuery.salaryTo) || undefined,
      techStack: Array.isArray(parsedQuery.techStack)
        ? parsedQuery.techStack.map(Number)
        : parsedQuery.techStack
        ? [Number(parsedQuery.techStack)]
        : [],
    },
  })

  const onSubmit: SubmitHandler<SearchFilters> = async (data) => {
    const newSearchParams: Filters = {
      techStack: data.techStack,
    }

    if (data.salaryFrom) newSearchParams.salaryFrom = data.salaryFrom
    if (data.salaryTo) newSearchParams.salaryTo = data.salaryTo

    const search = searchParams.get('search')

    const stringifiedParams = queryString.stringify({
      ...data,
      ...(search && { search }),
    })

    router.push(`?${stringifiedParams}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:gap-3">
        <TextField
          label="Salary from"
          type="number"
          errors={errors}
          {...register('salaryFrom', { valueAsNumber: true })}
        />
        <TextField
          label="Salary to"
          type="number"
          errors={errors}
          {...register('salaryTo', { valueAsNumber: true })}
        />
      </div>
      <Controller
        name="techStack"
        control={control}
        render={({ field }) => (
          <TechSelector
            label="Technology stack"
            name={field.name}
            initialOptions={field.value}
            onChange={(selected) => field.onChange(selected)}
            technologies={[
              { value: 1, label: 'React' },
              { value: 2, label: 'Vue' },
              { value: 3, label: 'Angular' },
              { value: 4, label: 'Typescript' },
              { value: 5, label: 'C#' },
            ]}
            errors={errors}
          />
        )}
      />
      <Button type="submit" className="mx-auto mt-6 font-semibold px-8">
        Apply
      </Button>
    </form>
  )
}
