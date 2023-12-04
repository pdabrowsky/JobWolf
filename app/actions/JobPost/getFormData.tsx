'use server'

import { PostJobFormOptions } from '@/components/organisms/PostJobForm/PostJobForm.types'
import prisma from '@/lib/prisma'

export const getAllJobFormOptions = async (): Promise<PostJobFormOptions> => {
  try {
    const [operatingModes, experiences, typesOfWork, techOptions] =
      await Promise.all([
        prisma.operatingMode.findMany({ orderBy: { id: 'asc' } }),
        prisma.experience.findMany({ orderBy: { id: 'asc' } }),
        prisma.typeOfWork.findMany({ orderBy: { id: 'asc' } }),
        prisma.technology.findMany({ orderBy: { id: 'asc' } }),
      ])

    return {
      operatingModes: operatingModes.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      experiences: experiences.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      typesOfWork: typesOfWork.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      techOptions: techOptions.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    }
  } catch (error) {
    console.error(error)
    return {
      operatingModes: [],
      experiences: [],
      typesOfWork: [],
      techOptions: [],
    }
  }
}
