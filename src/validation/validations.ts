import { normalizeInput } from '@/utils/normalizer'
import * as Yup from 'yup'

export const validateFullName = async (fullName: string) => {
  const schema = Yup.string()
    .required('O nome completo é obrigatório')
    .matches(/^[A-Za-zÀ-ú\s]+$/, 'Apenas letras e espaços são permitidos')
    .matches(/^(?!.*\s{2,}).*$/, 'Não pode haver espaços consecutivos')
    .matches(/^(?!.*\s$).*$/, 'Não pode terminar com espaço')
    .test(
      'full-name',
      'O nome completo deve ter pelo menos dois nomes',
      (value) => {
        if (!value) return false
        return value.trim().split(/\s+/).length > 1
      }
    )

  await schema.validate(fullName)
}

export const validatePhone = async (phone: string) => {
  const numericNumber = normalizeInput(phone)
  const phoneRegExp = /^\d{10,11}$/

  const schema = Yup.string()
    .required('O celular é obrigatório')
    .matches(phoneRegExp, 'O número do celular não é válido')

  await schema.validate(numericNumber)
}
export const validateCep = async (cep: string) => {
  const numericCep = normalizeInput(cep)

  const schema = Yup.string()
    .required('O CEP é obrigatório')
    .matches(/^\d{8}$/, 'Formato de CEP inválido')

  await schema.validate(numericCep)
}
export const validateStreet = async (street: string) => {
  const schema = Yup.string().required('A rua é obrigatória')

  await schema.validate(street)
}

export const validateNeighborhood = async (neighborhood: string) => {
  const schema = Yup.string().required('O bairro é obrigatório')

  await schema.validate(neighborhood)
}

export const validateCity = async (city: string) => {
  const schema = Yup.string().required('A cidade é obrigatória')

  await schema.validate(city)
}

export const validateState = async (state: string) => {
  const schema = Yup.string().required('O estado é obrigatório')

  await schema.validate(state)
}

export const validateNumber = async (number: string) => {
  const schema = Yup.string().required('O número é obrigatório')

  await schema.validate(number)
}

export function validateCPF(cpf: string): boolean {
  const cleanedCPF = cpf.replace(/[^\d]+/g, '')
  if (cleanedCPF.length !== 11) return false

  if (/^(\d)\1{10}$/.test(cleanedCPF)) return false

  const cpfArray = cleanedCPF.split('').map(Number)

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += cpfArray[i] * (10 - i)
  }

  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== cpfArray[9]) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += cpfArray[i] * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== cpfArray[10]) return false

  return true
}

export function validateRG(rg: string): boolean {
  const cleanedRG = rg.replace(/[^\dXx]+/g, '')

  const rgRegex = /^\d{8}[\dXx]$/
  return rgRegex.test(cleanedRG)
}
