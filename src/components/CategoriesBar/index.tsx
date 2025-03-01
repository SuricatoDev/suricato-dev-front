import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Funnel } from '@phosphor-icons/react/dist/ssr/Funnel'
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

import * as S from './styles'

interface Category {
  id: string
  label: string
  icon: React.ElementType
}

const categories: Category[] = [
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

export default function CategoriesBar() {
  const [selectedCategory, setSelectedCategory] = useState('destaques')
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const updateNavigation = (swiper: SwiperType) => {
    setShowLeft(!swiper.isBeginning)
    setShowRight(!swiper.isEnd)
  }

  return (
    <S.Wrapper>
      <div className="container">
        <S.Container>
          <S.CategoryMenu $showLeft={showLeft} $showRight={showRight}>
            <S.NavPrev className="swiper-button-prev categories-bar-swiper-button-prev"></S.NavPrev>

            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={24}
              breakpoints={{
                960: {
                  spaceBetween: 64
                }
              }}
              navigation={{
                prevEl: '.categories-bar-swiper-button-prev',
                nextEl: '.categories-bar-swiper-button-next'
              }}
              onSwiper={(swiper) => updateNavigation(swiper)}
              onSlideChange={(swiper) => updateNavigation(swiper)}
              className="swiper-container"
            >
              {categories.map(({ id, label, icon: Icon }) => {
                const isSelected = id === selectedCategory
                return (
                  <SwiperSlide key={id} style={{ width: 'auto' }}>
                    <S.CategoryItem
                      $selected={isSelected}
                      onClick={() => setSelectedCategory(id)}
                    >
                      <Icon size={24} weight="fill" />
                      <S.Label>{label}</S.Label>
                    </S.CategoryItem>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <S.NavNext className="swiper-button-next categories-bar-swiper-button-next"></S.NavNext>
          </S.CategoryMenu>

          <S.FilterButton>
            <Funnel size={20} weight="bold" />
            <S.FilterLabel>Filtros</S.FilterLabel>
          </S.FilterButton>
        </S.Container>
      </div>
    </S.Wrapper>
  )
}
