import React, { createContext, useState, ReactNode } from 'react'

export type ImageItem = {
  id: string
  file: File
  previewUrl: string
}

export type FormData = {
  category: string
  address: string
  departureDateTime: string
  arrivalDateTime: string
  availableSeats: string
  price: number
  images: ImageItem[]
  title: string
  description: string
}

type CreateAdContextProps = {
  formData: FormData
  updateFormData: (
    key: keyof FormData,
    value: string | number | ImageItem[]
  ) => void
}

export const CreateAdContext = createContext<CreateAdContextProps | undefined>(
  undefined
)

export const CreateAdProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    category: '',
    address: '',
    departureDateTime: '',
    arrivalDateTime: '',
    availableSeats: '',
    price: 0,
    images: [],
    title: '',
    description: ''
  })

  const updateFormData = (
    key: keyof FormData,
    value: string | number | ImageItem[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <CreateAdContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CreateAdContext.Provider>
  )
}
