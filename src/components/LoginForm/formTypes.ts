export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData extends LoginFormData {
  contactEmail: string
  firstName: string
  lastName: string
  birthDate: {
    day: number
    month: number
    year: number
  }
}
