'use client'

import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/atoms/TextField'
import { TextArea } from '@/components/atoms/TextArea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { toast } from 'react-toastify'
import { updateCandidateProfile } from '@/app/actions/profile/candidate'
import { useSession } from 'next-auth/react'
import { CandidateProfileFormProps } from './CandidateProfileForm.types'
import { FileDropzone } from '@/components/molecules/FileDropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { useState } from 'react'

const CandidateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Field is required')
    .max(80, 'Entry is too long'),
  lastName: z.string().min(1, 'Field is required').max(80, 'Entry is too long'),
  phone: z.string().min(5, 'Entry is too short').max(15, 'Entry is too long'),
  description: z.string().optional().or(z.literal('')),
  githubUrl: z
    .string()
    .trim()
    .max(80, 'Entry is too long')
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  portfolioUrl: z
    .string()
    .trim()
    .max(80, 'Entry is too long')
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  fileName: z.string().min(1, 'Field is required').max(60, ''),
  fileUrl: z.string().min(1, 'Field is required').max(180, ''),
})

type CandidateProfileFormInput = z.infer<typeof CandidateProfileSchema>

export const CandidateProfileForm = ({
  defaultData,
}: CandidateProfileFormProps) => {
  const { data: session } = useSession()
  const { edgestore } = useEdgeStore()
  const [isUploading, setIsUploading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CandidateProfileFormInput>({
    resolver: zodResolver(CandidateProfileSchema),
    defaultValues: defaultData,
  })

  const fileName = watch('fileName')
  const fileUrl = watch('fileUrl')

  const onSubmit: SubmitHandler<CandidateProfileFormInput> = async (data) => {
    const message = await updateCandidateProfile(data, session?.user.email)

    if (message.type === 'success') {
      toast.success(message.msg)
      if (data.fileUrl && data.fileUrl !== defaultData?.fileUrl) {
        await edgestore.publicFiles.confirmUpload({
          url: data.fileUrl,
        })
      }
    } else {
      toast.error(message.msg)
    }
  }

  const onFileUpload = async (file?: File) => {
    if (file) {
      setIsUploading(true)
      const res = await edgestore.publicFiles.upload({
        file: file,
        options: {
          temporary: true,
        },
      })
      setValue('fileUrl', res.url)
      setValue('fileName', file.name)
      setIsUploading(false)
    } else {
      setValue('fileName', '')
      setValue('fileUrl', '')
    }
  }

  return (
    <Card className="max-w-[500px] w-full flex flex-col p-6 lg:px-8">
      <h2 className="text-[22px] mb-8 font-medium">My Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Name*"
          placeholder="Your first name"
          errors={errors}
          {...register('firstName')}
        />
        <TextField
          label="Last Name*"
          placeholder="Your last name"
          errors={errors}
          {...register('lastName')}
        />
        <TextField
          label="Phone*"
          errors={errors}
          placeholder="Your phone number"
          {...register('phone')}
        />
        <TextArea
          label="Describe Yourself"
          rows={6}
          placeholder="A few words about you..."
          errors={errors}
          {...register('description')}
        />
        <TextField
          label="GitHub Link"
          errors={errors}
          placeholder="https://github.com/yourusername"
          {...register('githubUrl')}
        />
        <TextField
          label="Portfolio or Other Link"
          placeholder="https://yourportfolio.com"
          errors={errors}
          {...register('portfolioUrl')}
        />
        <FileDropzone
          name="cv"
          label="Upload CV or other file*"
          fileName={fileName}
          fileUrl={fileUrl}
          errorMessageForm={
            errors?.fileName?.message || errors?.fileUrl?.message
          }
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
          disabled={isSubmitting || !isDirty || isUploading}
        >
          Save
        </Button>
      </form>
    </Card>
  )
}
