import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart'
import { Van } from '@phosphor-icons/react/dist/ssr/Van'
import { UserCircle } from '@phosphor-icons/react/dist/ssr/UserCircle'

export const MobileFooterNavigation = {
  explorar: {
    id: 'explorar',
    label: 'Explorar',
    icon: MagnifyingGlass,
    href: '/'
  },
  favoritos: {
    id: 'favoritos',
    label: 'Favoritos',
    icon: Heart,
    href: '/favoritos'
  },
  viagens: {
    id: 'viagens',
    label: 'Viagens',
    icon: Van,
    href: '/viagens'
  },
  perfil: { id: 'perfil', label: 'Perfil', icon: UserCircle, href: '/perfil' },
  entrar: { id: 'entrar', label: 'Entrar', icon: UserCircle, href: '/login' }
}
