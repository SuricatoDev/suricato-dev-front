export interface Caravan {
  id: number
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
  imagens?: Image[]
}

interface Image {
  id: string
  path: string
  ordem: number
  caravana_id: number
}
