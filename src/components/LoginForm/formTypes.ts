export interface LoginFormData {
  email: string
  contactEmail: string
  password: string
  birthDate: {
    day: string
    month: string
    year: string
  }
  optin: boolean
  firstName: string
  lastName: string
}
