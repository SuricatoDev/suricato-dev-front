/* eslint-disable @typescript-eslint/no-unused-vars */
import { Briefcase } from '@phosphor-icons/react/dist/ssr/Briefcase'
import { Buildings } from '@phosphor-icons/react/dist/ssr/Buildings'
import { Church } from '@phosphor-icons/react/dist/ssr/Church'
import { Confetti } from '@phosphor-icons/react/dist/ssr/Confetti'
import { DotsThreeCircle } from '@phosphor-icons/react/dist/ssr/DotsThreeCircle'
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap'
import { ImageSquare } from '@phosphor-icons/react/dist/ssr/ImageSquare'
import { MaskHappy } from '@phosphor-icons/react/dist/ssr/MaskHappy'
import { SoccerBall } from '@phosphor-icons/react/dist/ssr/SoccerBall'
import { Ticket } from '@phosphor-icons/react/dist/ssr/Ticket'

interface Category {
  id: string
  label: string
  icon: React.ElementType
}

export const categories: Category[] = [
  { id: 'feira', label: 'Feira', icon: Buildings },
  { id: 'festa', label: 'Festa', icon: Confetti },
  { id: 'shows-e-festivais', label: 'Shows e festivais', icon: Ticket },
  { id: 'exposicao', label: 'Exposição', icon: ImageSquare },
  { id: 'religioso', label: 'Religioso', icon: Church },
  { id: 'academico', label: 'Acadêmico', icon: GraduationCap },
  { id: 'corporativo', label: 'Corporativo', icon: Briefcase },
  { id: 'teatro', label: 'Teatro', icon: MaskHappy },
  { id: 'esportivo', label: 'Esportivo', icon: SoccerBall },
  { id: 'outros', label: 'Outros', icon: DotsThreeCircle }
]
