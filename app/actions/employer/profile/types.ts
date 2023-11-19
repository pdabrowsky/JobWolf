export type EmployerProfileResponse = {
  data?: EmployerProfileData
}

export type EmployerProfileData = {
  name: string
  city: string
  address: string
  description: string
  phone: string
  website: string
}
