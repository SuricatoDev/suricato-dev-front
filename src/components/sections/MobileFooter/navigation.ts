import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { Van } from '@phosphor-icons/react/dist/ssr/Van'
import { UserCircle } from '@phosphor-icons/react/dist/ssr/UserCircle'
import { Tag } from '@phosphor-icons/react/dist/ssr/Tag'

export const MobileFooterNavigation = {
  explorar: {
    id: 'explorar',
    label: 'Explorar',
    icon: MagnifyingGlass,
    href: '/'
  },
  caravanas: {
    id: 'caravanas',
    label: 'Caravanas',
    icon: Van,
    href: '/caravanas'
  },
  perfil: { id: 'perfil', label: 'Perfil', icon: UserCircle, href: '/conta' },
  entrar: { id: 'entrar', label: 'Entrar', icon: UserCircle, href: '/login' },
  anunciar: {
    id: 'anunciar',
    label: 'Anunciar',
    icon: Tag,
    href: '/anunciar'
  }
}
