import { useState } from 'react'

import { categories } from '@/constants/categories'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import * as S from './styles'

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
              freeMode={true}
              touchReleaseOnEdges={true}
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
        </S.Container>
      </div>
    </S.Wrapper>
  )
}
