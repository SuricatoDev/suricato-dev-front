import { House } from '@phosphor-icons/react/dist/ssr/House'
import { Island } from '@phosphor-icons/react/dist/ssr/Island'
import { Confetti } from '@phosphor-icons/react/dist/ssr/Confetti'
import { Mountains } from '@phosphor-icons/react/dist/ssr/Mountains'
import { Buildings } from '@phosphor-icons/react/dist/ssr/Buildings'
import { Path } from '@phosphor-icons/react/dist/ssr/Path'
import { Farm } from '@phosphor-icons/react/dist/ssr/Farm'
import { Barn } from '@phosphor-icons/react/dist/ssr/Barn'
import { Coffee } from '@phosphor-icons/react/dist/ssr/Coffee'
import { Smiley } from '@phosphor-icons/react/dist/ssr/Smiley'
import { Park } from '@phosphor-icons/react/dist/ssr/Park'

interface Category {
  id: string
  label: string
  icon: React.ElementType
}

export const categories: Category[] = [
  { id: 'destaques', label: 'Destaques', icon: House },
  { id: 'shows', label: 'Shows', icon: Confetti },
  { id: 'praias', label: 'Praias', icon: Island },
  { id: 'montanhas', label: 'Montanhas', icon: Mountains },
  { id: 'cidades', label: 'Cidades', icon: Buildings },
  { id: 'trilhas', label: 'Trilhas', icon: Path },
  { id: 'chacaras', label: 'Chácaras', icon: Farm },
  { id: 'fazendas', label: 'Fazendas', icon: Barn },
  { id: 'cafes', label: 'Cafés', icon: Coffee },
  { id: 'parque-de-diversao', label: 'Parques de diversão', icon: Smiley },
  { id: 'parques', label: 'Parques', icon: Park }
]
