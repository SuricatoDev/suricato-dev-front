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
  tipo: string | null
  foto_perfil: string | null
  ativo: number
  created_at: string
  updated_at: string
  cpf: string | null
  rg: string | null
}

export interface UserWithToken extends User {
  access_token: string
  token_type: string
}
