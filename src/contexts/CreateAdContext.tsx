
import React, { createContext, useState, ReactNode } from 'react'

export type FormData = {
  category: string
  propertyType: string
  spaceType: string
  address: string
  departureDateTime: string
  arrivalDateTime: string
  availableSeats: string
  price: string
  images: File[]
}

type CreateAdContextProps = {
  formData: FormData
  updateFormData: (key: keyof FormData, value: string | File[]) => void
}

export const CreateAdContext = createContext<CreateAdContextProps | undefined>(
  undefined
)

export const CreateAdProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    category: '',
    propertyType: '',
    spaceType: '',
    address: '',
    departureDateTime: '',
    arrivalDateTime: '',
    availableSeats: '',
    price: '',
    images: []
  })

  const updateFormData = (key: keyof FormData, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <CreateAdContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CreateAdContext.Provider>
  )
}
