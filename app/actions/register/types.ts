export type UserRole = 'candidate' | 'employer'

export type RegisterResponse = {
  type: 'success' | 'error'
  msg: string
}
