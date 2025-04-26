import React, { ReactNode, createContext, useContext, useState } from 'react'

export type ImageItem = {
  id: string
  file?: File
  previewUrl: string
  order: number
}

export type CaravanFormProps = {
  caravana_id?: number
  titulo: string
  descricao: string
  categoria: string
  data_partida: string
  data_retorno: string
  endereco_origem: string
  numero_origem: string
  bairro_origem: string
  cep_origem: string
  cidade_origem: string
  estado_origem: string
  complemento_origem: string

  endereco_destino: string
  numero_destino: string
  bairro_destino: string
  cep_destino: string
  cidade_destino: string
  estado_destino: string
  complemento_destino: string

  numero_vagas: number
  valor: number

  organizador_id: number

  imagens: ImageItem[]
}

export interface CreateAdProviderProps {
  children: ReactNode
  initialData?: CaravanFormProps
}

type CreateAdContextProps = {
  formData: CaravanFormProps
  updateFormData: (
    key: keyof CaravanFormProps,
    value: string | number | ImageItem[]
  ) => void
}

export const CreateAdContext = createContext<CreateAdContextProps | undefined>(
  undefined
)

export const CreateAdProvider = ({
  children,
  initialData
}: CreateAdProviderProps) => {
  const [formData, setFormData] = useState<CaravanFormProps>(
    initialData || {
      titulo: '',
      descricao: '',
      categoria: '',
      data_partida: '',
      data_retorno: '',
      endereco_origem: '',
      numero_origem: '',
      bairro_origem: '',
      cep_origem: '',
      cidade_origem: '',
      estado_origem: '',
      complemento_origem: '',
      endereco_destino: '',
      numero_destino: '',
      bairro_destino: '',
      cep_destino: '',
      cidade_destino: '',
      estado_destino: '',
      complemento_destino: '',
      numero_vagas: 0,
      valor: 0,
      organizador_id: 0,
      imagens: []
    }
  )

  const updateFormData = (
    key: keyof CaravanFormProps,
    value: string | number | ImageItem[]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <CreateAdContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CreateAdContext.Provider>
  )
}

export const useCreateAd = () => {
  const context = useContext(CreateAdContext)
  if (!context)
    throw new Error('useCreateAd must be used within CreateAdProvider')
  return context
}
