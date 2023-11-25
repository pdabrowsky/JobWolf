'use client'

import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/atoms/TextField'
import { TextArea } from '@/components/atoms/TextArea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { updateEmployerProfile } from '@/app/actions/employer/profile'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { EmployerProfileFormProps } from './EmployerProfileForm.types'
import { FileDropzone } from '@/components/molecules/FileDropzone'
import { useEdgeStore } from '@/lib/edgestore'

const EmployerProfileSchema = z.object({
  name: z.string().min(1, 'Field is required'),
  city: z.string().min(1, 'Field is required'),
  address: z.string().min(1, 'Field is required'),
  description: z.string().max(500).min(1, 'Field is required'),
  phone: z.string().min(1, 'Field is required'),
  website: z
    .string()
    .min(1, 'Field is required')
    .url()
    .optional()
    .or(z.literal('')),
  logoName: z.string().optional(),
  logoUrl: z.string().optional(),
})

type EmployerProfileFormInput = z.infer<typeof EmployerProfileSchema>

export const EmployerProfileForm = ({
  defaultData,
}: EmployerProfileFormProps) => {
  const { data: session } = useSession()
  const { edgestore } = useEdgeStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmployerProfileFormInput>({
    resolver: zodResolver(EmployerProfileSchema),
    defaultValues: defaultData,
  })

  const logoName = watch('logoName')
  const logoUrl = watch('logoUrl')

  const onSubmit: SubmitHandler<EmployerProfileFormInput> = async (data) => {
    const message = await updateEmployerProfile(data, session?.user.email)
    if (message.type === 'success') {
      toast.success(message.msg)
      if (data.logoUrl && data.logoUrl !== defaultData?.logoUrl) {
        await edgestore.publicFiles.confirmUpload({
          url: data.logoUrl,
        })
      }
    } else {
      toast.error(message.msg)
    }
  }

  const onFileUpload = async (file?: File) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file: file,
        options: {
          temporary: true,
        },
      })
      setValue('logoUrl', res.url)
      setValue('logoName', file.name)
    } else {
      setValue('logoName', '')
      setValue('logoUrl', '')
    }
  }

  return (
    <Card className="max-w-[500px] w-full flex flex-col p-6 lg:px-8">
      <h2 className="text-[22px] mb-8 font-medium">My Profile (Employer)</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Company Name"
          placeholder="Enter company name"
          errors={errors}
          {...register('name')}
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
          {...register('description')}
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
          {...register('website')}
        />
        <FileDropzone
          fileName={logoName}
          name="logo"
          label="Company Logo"
          fileUrl={logoUrl}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 5, // 5MB
          }}
          onChange={(file) => {
            onFileUpload(file)
          }}
          disabled={isSubmitting}
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
