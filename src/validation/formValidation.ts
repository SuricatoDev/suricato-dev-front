import { checkPasswordStrength } from '@/utils/validations'
import * as Yup from 'yup'
import { validateCPF, validateRG } from './validations'

const phoneRegExp = /^(\([1-9]{2}\) [9]{1}[0-9]{4}-[0-9]{4})$/
const removeMask = (value: string = ''): string =>
  value.replace(/[^\dA-Za-z]/g, '')

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('O e-mail é obrigatório')
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Formato de e-mail inválido'),

  contactEmail: Yup.string()
    .required('O e-mail é obrigatório')
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Formato de e-mail inválido'),

  phone: Yup.string()
    .required('O celular é obrigatório')
    .matches(phoneRegExp, 'O número do celular não é válido'),

  password: Yup.string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .test(
      'password-strength',
      'A senha é fraca ou contém informações pessoais',
      function (value) {
        const { firstName, contactEmail } = this.parent
        return checkPasswordStrength(value || '', firstName, contactEmail)
      }
    ),

  firstName: Yup.string()
    .required('O nome é obrigatório')
    .matches(/^[A-Za-zÀ-ú\s]+$/, 'Apenas letras e espaços são permitidas')
    .matches(/^(?!.*\s{2,}).*$/, 'Não pode haver espaços consecutivos')
    .matches(/^(?!.*\s$).*$/, 'Não pode terminar com espaço'),

  lastName: Yup.string()
    .required('O nome é obrigatório')
    .matches(/^[A-Za-zÀ-ú\s]+$/, 'Apenas letras são permitidas')
    .matches(/^(?!.*\s{2,}).*$/, 'Não pode haver espaços consecutivos')
    .matches(/^(?!.*\s$).*$/, 'Não pode terminar com espaço'),

  birthDate: Yup.object().shape({
    day: Yup.number()
      .required('O dia é obrigatório')
      .transform((value) => Number(value))
      .test('dia-valido', 'Dia inválido', (value) => {
        const day = Number(value)
        return day > 0 && day <= 31
      }),
    month: Yup.number()
      .required('O mês é obrigatório')
      .transform((value) => Number(value))
      .test('mes-valido', 'Mês inválido', (value) => {
        const month = Number(value)
        return month > 0 && month <= 12
      }),
    year: Yup.number()
      .required('O ano é obrigatório')
      .transform((value) => Number(value))
      .test('idade-minima', 'Você deve ter pelo menos 18 anos', function () {
        const { day, month, year } = this.parent
        const d = Number(day)
        const m = Number(month)
        const y = Number(year)
        const birthDate = new Date(y, m - 1, d)
        const ageDifMs = Date.now() - birthDate.getTime()
        const ageDate = new Date(ageDifMs)
        const age = Math.abs(ageDate.getUTCFullYear() - 1970)
        return age >= 18
      })
  })
})

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('O e-mail é obrigatório')
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Formato de e-mail inválido'),

  password: Yup.string().required('A senha é obrigatória')
})

export const getValidationSchema = (step: number) => {
  return step === 1 ? loginValidationSchema : signupValidationSchema
}

export const passengerFormStep1Schema = Yup.object().shape({
  cpf: Yup.string()
    .transform((_, originalValue) => removeMask(originalValue))
    .required('CPF é obrigatório')
    .test(
      'cpf-valid',
      'CPF inválido',
      (value) => !!value && validateCPF(value)
    ),
  rg: Yup.string()
    .transform((_, originalValue) => removeMask(originalValue).toUpperCase())
    .required('RG é obrigatório')
    .test('rg-valid', 'RG inválido', (value) => !!value && validateRG(value)),
  emergencyContact: Yup.string()
    .transform((_, originalValue) => removeMask(originalValue))
    .required('Telefone é obrigatório')
    .matches(/^\d{11}$/, 'O telefone não é válido')
})
