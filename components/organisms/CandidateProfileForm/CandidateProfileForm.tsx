'use client'

import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/components/atoms/TextField'
import { TextArea } from '@/components/atoms/TextArea'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { toast } from 'react-toastify'
import { updateCandidateProfile } from '@/app/actions/candidate/profile'
import { useSession } from 'next-auth/react'
import { CandidateProfileFormProps } from './CandidateProfileForm.types'
import { revalidatePath } from 'next/cache'

const CandidateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  description: z.string().max(200),
  githubUrl: z
    .string()
    .trim()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  portfolioUrl: z
    .string()
    .trim()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
})

type CandidateProfileFormInput = z.infer<typeof CandidateProfileSchema>

export const CandidateProfileForm = ({
  defaultData,
}: CandidateProfileFormProps) => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CandidateProfileFormInput>({
    resolver: zodResolver(CandidateProfileSchema),
    defaultValues: defaultData,
  })

  const onSubmit: SubmitHandler<CandidateProfileFormInput> = async (data) => {
    const message = await updateCandidateProfile(data, session?.user.email)

    if (message.type === 'success') {
      toast.success(message.msg)
      revalidatePath('/profile')
    } else {
      toast.error(message.msg)
    }
  }

  return (
    <Card className="max-w-[500px] w-full flex flex-col p-6 lg:px-8">
      <h2 className="text-[22px] mb-8 font-medium">My Profile (Candidate)</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          label="Name"
          placeholder="Your first name"
          errors={errors}
          {...register('firstName')}
        />
        <TextField
          label="Last Name"
          placeholder="Your last name"
          errors={errors}
          {...register('lastName')}
        />
        <TextField
          label="Phone"
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
