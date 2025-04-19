import { Heart } from '@phosphor-icons/react/dist/ssr/Heart'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { Tag } from '@phosphor-icons/react/dist/ssr/Tag'
import { UserCircle } from '@phosphor-icons/react/dist/ssr/UserCircle'
import { Van } from '@phosphor-icons/react/dist/ssr/Van'

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
    href: '/anuncios'
  },
  favoritos: {
    id: 'favoritos',
    label: 'Favoritos',
    icon: Heart,
    href: '/favoritos'
  }
}
