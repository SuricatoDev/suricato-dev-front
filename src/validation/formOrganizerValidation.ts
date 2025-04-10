import * as Yup from 'yup'

export const organizerStep1Schema = Yup.object().shape({
  razao_social: Yup.string()
    .required('A razão social é obrigatória')
    .max(100, 'Máximo de 100 caracteres'),
  nome_fantasia: Yup.string().max(100, 'Máximo de 100 caracteres'),
  cnpj: Yup.string()
    .required('O CNPJ é obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'Formato de CNPJ inválido'),

  inscricao_estadual: Yup.string(),
  inscricao_municipal: Yup.string(),
  telefone_comercial: Yup.string()
    .transform((originalValue) =>
      originalValue ? originalValue.replace(/\D/g, '') : ''
    )
    .required('O telefone comercial é obrigatório')
    .matches(/^\d{10,11}$/, 'Formato de telefone inválido')
})

export const organizerStep2Schema = Yup.object().shape({
  endereco: Yup.string().required('O endereço é obrigatório'),
  numero: Yup.string().required('O número é obrigatório'),
  bairro: Yup.string().required('O bairro é obrigatório'),
  cep: Yup.string().required('O CEP é obrigatório'),
  cidade: Yup.string().required('A cidade é obrigatória'),
  estado: Yup.string().required('O estado é obrigatório')
})

export const getOrganizerValidationSchema = (step: number) => {
  return step === 1 ? organizerStep1Schema : organizerStep2Schema
}
