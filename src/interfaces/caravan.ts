export interface Caravan {
  id: string
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
  endereco_destino: string
  numero_destino: string
  bairro_destino: string
  cep_destino: string
  cidade_destino: string
  estado_destino: string
  numero_vagas: number
  valor: number
  organizador_id: number
  imagens: {
    path: string
  }[]
}
interface Organizer {
  id: number
  razao_social: string
  nome_fantasia: string
  bairro: string
  cidade: string
  estado: string
  created_at: string
  user: {
    foto_perfil: string
  }
}

export interface SingleCaravan extends Caravan {
  organizador: Organizer
}
