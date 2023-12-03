'use client'

import { z } from 'zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/atoms/TextField'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { DropdownSelect } from '@/components/atoms/DropdownSelect'
import { TextArea } from '@/components/atoms/TextArea'
import { TechSelector } from '@/components/molecules/TechSelector'
import {
  operatingModeOptions,
  experienceOptions,
  typeOfWorkOptions,
  techOptions,
} from './PostJobForm.config'

const PostJobSchema = z.object({
  title: z.string().min(1, 'Required'),
  operatingMode: z.string().min(1, 'Required'),
  experience: z.string().min(1, 'Required'),
  typeOfWork: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  mustHaveTechs: z.array(z.string()),
  niceToHaveTechs: z.array(z.string()),
})

type PostJobFormInput = z.infer<typeof PostJobSchema>

export const PostJobForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostJobFormInput>({
    resolver: zodResolver(PostJobSchema),
  })

  const onSubmit: SubmitHandler<PostJobFormInput> = async (data) => {
    console.log(data)
    // const message = await updateEmployerProfile(data, session?.user.email)
    // if (message.type === 'success') {
    //   toast.success(message.msg)
    // } else {
    //   toast.error(message.msg)
    // }
  }

  return (
    <Card className="max-w-[800px] w-full flex flex-col p-6 lg:px-8">
      <h2 className="text-[22px] mb-8 font-medium">
        Fill out the form to post a job offer
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:gap-3">
          <TextField
            label="Title"
            placeholder="Enter job title"
            errors={errors}
            {...register('title')}
          />
          <Controller
            name="operatingMode"
            control={control}
            render={({ field }) => (
              <DropdownSelect
                label="Operating mode"
                name={field.name}
                options={operatingModeOptions}
                errors={errors}
                placeholder="Select operating mode"
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-3">
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <DropdownSelect
                label="Experience"
                name={field.name}
                options={experienceOptions}
                errors={errors}
                placeholder="Select experience"
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          <Controller
            name="typeOfWork"
            control={control}
            render={({ field }) => (
              <DropdownSelect
                label="Type of work"
                name={field.name}
                options={typeOfWorkOptions}
                errors={errors}
                placeholder="Select type of work"
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
        <Controller
          name="mustHaveTechs"
          control={control}
          render={({ field }) => (
            <TechSelector
              label="Must Have Technologies"
              name={field.name}
              onChange={(selected) => field.onChange(selected)}
              technologies={techOptions}
              errors={errors}
            />
          )}
        />
        <Controller
          name="niceToHaveTechs"
          control={control}
          render={({ field }) => (
            <TechSelector
              label="Nice To Have Technologies"
              name={field.name}
              onChange={(selected) => field.onChange(selected)}
              technologies={techOptions}
              errors={errors}
            />
          )}
        />
        <TextArea
          label="Description"
          rows={8}
          placeholder="Provide offer description"
          errors={errors}
          {...register('description')}
        />

        <Button
          type="submit"
          className="mx-auto mt-6 font-semibold px-8"
          disabled={isSubmitting}
        >
          Post
        </Button>
      </form>
    </Card>
  )
}
