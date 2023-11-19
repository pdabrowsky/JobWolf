'use client'

import { z } from 'zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/atoms/TextField'
import { TextArea } from '@/components/atoms/TextArea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { DropdownSelect } from '@/components/atoms/DropdownSelect/DropdownSelect'

const EmployerProfileSchema = z.object({
  companyName: z.string().min(1, 'Field is required'),
  city: z.string().min(1, 'Field is required'),
  address: z.string().min(1, 'Field is required'),
  companyDescription: z.string().max(500).min(1, 'Field is required'),
  phone: z.string().min(1, 'Field is required'),
  websiteUrl: z
    .string()
    .min(1, 'Field is required')
    .url()
    .optional()
    .or(z.literal('')),
  category: z.string(),
})

type EmployerProfileFormInput = z.infer<typeof EmployerProfileSchema>

const dropdownOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
]

export const EmployerProfileForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EmployerProfileFormInput>({
    resolver: zodResolver(EmployerProfileSchema),
  })

  const onSubmit: SubmitHandler<EmployerProfileFormInput> = async (data) => {
    console.log(data)
    // const message = await updateEmployerProfile(data, session?.user.email)

    // if (message.type === 'success') {
    //   toast.success(message.msg)
    // } else {
    //   toast.error(message.msg)
    // }
  }

  return (
    <Card className="max-w-[500px] w-full flex flex-col p-6 lg:px-8">
      <h2 className="text-[22px] mb-8 font-medium">My Profile (Employer)</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Company Name"
          placeholder="Enter company name"
          errors={errors}
          {...register('companyName')}
        />
        <div className="flex gap-3">
          <TextField
            label="City"
            placeholder="Enter city"
            errors={errors}
            {...register('city')}
          />
          <TextField
            label="Address"
            placeholder="Enter address"
            errors={errors}
            {...register('address')}
          />
        </div>
        <TextArea
          label="Company Description"
          rows={6}
          placeholder="Describe your company"
          errors={errors}
          {...register('companyDescription')}
        />
        <TextField
          label="Phone"
          placeholder="Enter phone number"
          errors={errors}
          {...register('phone')}
        />
        <TextField
          label="Website URL"
          placeholder="https://yourcompany.com"
          errors={errors}
          {...register('websiteUrl')}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <DropdownSelect
              label="Category"
              options={dropdownOptions}
              errors={errors}
              placeholder="Select a category"
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Button
          type="submit"
          className="mx-auto mt-6 font-semibold px-8"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </form>
    </Card>
  )
}
