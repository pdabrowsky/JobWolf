import { Button } from '@/components/atoms/Button'
import { TextField } from '@/components/atoms/TextField'
import { TechSelector } from '@/components/molecules/TechSelector'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const PostJobSchema = z.object({
  salaryFrom: z.string(),
  salaryTo: z.string(),
  techStack: z.array(z.number()),
})

type SearchFilters = z.infer<typeof PostJobSchema>

export const SearchFiltersForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchFilters>({
    resolver: zodResolver(PostJobSchema),
  })

  const onSubmit: SubmitHandler<SearchFilters> = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:gap-3">
        <TextField
          label="Salary from"
          errors={errors}
          {...register('salaryFrom')}
        />
        <TextField
          label="Salary to"
          errors={errors}
          {...register('salaryTo')}
        />
      </div>
      <Controller
        name="techStack"
        control={control}
        render={({ field }) => (
          <TechSelector
            label="Technology stack"
            name={field.name}
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
