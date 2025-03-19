export interface User {
  id: string
  nome: string
  email: string
  email_verified_at: string | null
  data_nascimento: string
  endereco: string | null
  numero: string | null
  complemento: string | null
  bairro: string | null
  cep: string | null
  cidade: string | null
  estado: string | null
  telefone: string
  foto_perfil: string | null
  ativo: number
  created_at: string
  updated_at: string
  cpf: string | null
  rg: string | null
  passageiro: boolean
  organizador: boolean
}

export interface UserWithToken extends User {
  access_token: string
  token_type: string
}

export interface PassageiroData {
  id: number
  cpf: string
  rg: string
  contato_emergencia: string | null
  created_at: string
  updated_at: string
}

export interface OrganizadorData {
  id: number
  razao_social: string
  cnpj: string
  cadastro: string
  inscricao_estadual: string
  inscricao_municipal: string
}

export interface LoginResponse {
  message: string
  user: UserWithToken
  passageiro: PassageiroData | null
  organizador: OrganizadorData | null
  access_token: string
  token_type: string
}
