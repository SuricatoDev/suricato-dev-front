/* eslint-disable @typescript-eslint/no-unused-vars */
import { Barn } from '@phosphor-icons/react/dist/ssr/Barn'
import { Buildings } from '@phosphor-icons/react/dist/ssr/Buildings'
import { Coffee } from '@phosphor-icons/react/dist/ssr/Coffee'
import { Confetti } from '@phosphor-icons/react/dist/ssr/Confetti'
import { Farm } from '@phosphor-icons/react/dist/ssr/Farm'
import { Island } from '@phosphor-icons/react/dist/ssr/Island'
import { Mountains } from '@phosphor-icons/react/dist/ssr/Mountains'
import { Park } from '@phosphor-icons/react/dist/ssr/Park'
import { Path } from '@phosphor-icons/react/dist/ssr/Path'
import { Smiley } from '@phosphor-icons/react/dist/ssr/Smiley'

interface Category {
  id: string
  label: string
  icon: React.ElementType
}

export const categories: Category[] = [
  { id: 'show', label: 'Show', icon: Confetti },
  { id: 'praia', label: 'Praia', icon: Island },
  { id: 'montanha', label: 'Montanha', icon: Mountains },
  { id: 'cidade', label: 'Cidade', icon: Buildings },
  { id: 'trilha', label: 'Trilha', icon: Path },
  { id: 'chacara', label: 'Chácara', icon: Farm },
  { id: 'fazenda', label: 'Fazenda', icon: Barn },
  { id: 'cafe', label: 'Café', icon: Coffee },
  { id: 'parque-de-diversao', label: 'Parques de diversão', icon: Smiley },
  { id: 'parque', label: 'Parque', icon: Park }
]

const eventos = [
  'Cafés',
  'Carnaval',
  'Cidades',
  'Chácaras',
  'Fazendas',
  'Festivais',
  'Jogos',
  'Montanhas',
  'Museus',
  'Parques Aquáticos',
  'Parques de Diversão',
  'Parques Naturais',
  'Praias',
  'Resortes',
  'Shows',
  'Trilhas'
]
