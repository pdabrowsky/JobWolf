export enum UserRole {
  Candidate = 'candidate',
  Employer = 'employer',
}

export type CustomResponse = {
  type: 'success' | 'error'
  msg: string
}
