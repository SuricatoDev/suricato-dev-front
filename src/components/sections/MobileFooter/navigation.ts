import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { Van } from '@phosphor-icons/react/dist/ssr/Van'
import { UserCircle } from '@phosphor-icons/react/dist/ssr/UserCircle'

export const MobileFooterNavigation = {
  explorar: {
    id: 'explorar',
    label: 'Explorar',
    icon: MagnifyingGlass,
    href: '/'
  },
  viagens: {
    id: 'viagens',
    label: 'Viagens',
    icon: Van,
    href: '/viagens'
  },
  perfil: { id: 'perfil', label: 'Perfil', icon: UserCircle, href: '/conta' },
  entrar: { id: 'entrar', label: 'Entrar', icon: UserCircle, href: '/login' }
}
