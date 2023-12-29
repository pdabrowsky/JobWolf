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
import { PostJobFormProps } from './PostJobForm.types'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { postOffer } from '@/app/actions/offer/employer/postOffer'
import { SalaryRange } from '../SalaryRange'

const PostJobSchema = z.object({
  title: z.string().min(1, 'Required').max(80, 'Entry is too long'),
  description: z.string().min(1, 'Required'),
  operatingMode: z.number().min(1, 'Required'),
  experience: z.number().min(1, 'Required'),
  typeOfWork: z.number().min(1, 'Required'),
  mustHaveTechs: z.array(z.number()),
  niceToHaveTechs: z.array(z.number()),
  salaryRange: z
    .array(
      z
        .object({
          from: z
            .number()
            .nonnegative('Enter a positive number')
            .min(1, 'Required'),
          to: z
            .number()
            .nonnegative('Enter a positive number')
            .min(1, 'Required'),
          contractType: z.number().min(1, 'Required'),
        })
        .refine((data) => data.from <= data.to, {
          message: 'From value cannot be greater than To value',
          path: ['from_to'],
        })
    )
    .refine(
      (data) => {
        const contractTypeSet = new Set(data.map((item) => item.contractType))
        return contractTypeSet.size === data.length
      },
      {
        message: 'Duplicate contract types are not allowed',
        path: ['contractType'],
      }
    ),
})

export type PostJobFormInput = z.infer<typeof PostJobSchema>

export const PostJobForm = ({ selectOptions }: PostJobFormProps) => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostJobFormInput>({
    resolver: zodResolver(PostJobSchema),
    defaultValues: {
      salaryRange: [{ from: 0, to: 0 }],
    },
  })

  const onSubmit: SubmitHandler<PostJobFormInput> = async (data) => {
    if (!session?.user.email)
      return toast.error('You must be logged in to post a job offer')

    const message = await postOffer(session.user.email, data)
    if (message.type === 'success') {
      toast.success(message.msg)
      reset()
    } else {
      toast.error(message.msg)
    }
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
            placeholder="Enter job title*"
            errors={errors}
            {...register('title')}
          />
          <Controller
            name="operatingMode"
            control={control}
            render={({ field }) => (
              <DropdownSelect
                label="Operating mode*"
                name={field.name}
                options={selectOptions.operatingMode}
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
                label="Experience*"
                name={field.name}
                options={selectOptions.experience}
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
                label="Type of work*"
                name={field.name}
                options={selectOptions.typeOfWork}
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
              label="Must Have Technologies*"
              name={field.name}
              initialOptions={field.value}
              onChange={(selected) => field.onChange(selected)}
              technologies={selectOptions.technology}
              errors={errors}
            />
          )}
        />
        <Controller
          name="niceToHaveTechs"
          control={control}
          render={({ field }) => (
            <TechSelector
              label="Nice To Have Technologies*"
              name={field.name}
              initialOptions={field.value}
              onChange={(selected) => field.onChange(selected)}
              technologies={selectOptions.technology}
              errors={errors}
            />
          )}
        />
        <SalaryRange
          name="salaryRange"
          control={control}
          formErrors={errors}
          register={register}
          contractTypes={selectOptions.contractType}
        />
        <TextArea
          label="Description*"
          rows={10}
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
