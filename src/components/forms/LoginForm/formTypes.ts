export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData extends LoginFormData {
  contactEmail: string
  firstName: string
  lastName: string
  phone: string
  birthDate: {
    day: number
    month: number
    year: number
  }
}
