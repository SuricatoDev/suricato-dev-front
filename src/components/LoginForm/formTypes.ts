export interface LoginFormData {
  email: string
  contactEmail: string
  password: string
  birthDate: {
    day: number
    month: number
    year: number
  }
  firstName: string
  lastName: string
}
