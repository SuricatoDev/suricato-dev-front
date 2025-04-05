export interface OrganizerFormData {
  razao_social: string
  cnpj: string
  inscricao_estadual?: string
  inscricao_municipal?: string
  endereco: string
  numero: string
  complemento?: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  telefone_comercial: string
}

export type OrganizerFormDataStep1 = Pick<
  OrganizerFormData,
  | 'razao_social'
  | 'cnpj'
  | 'inscricao_estadual'
  | 'inscricao_municipal'
  | 'telefone_comercial'
>

export type OrganizerFormDataStep2 = Pick<
  OrganizerFormData,
  'endereco' | 'numero' | 'complemento' | 'bairro' | 'cep' | 'cidade' | 'estado'
>
