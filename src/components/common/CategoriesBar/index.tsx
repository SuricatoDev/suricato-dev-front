// components/common/CategoriesBar.tsx
import { useState } from 'react'

import { categories } from '@/constants/categories'
import { useRouter } from 'next/router'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import * as S from './styles'

export default function CategoriesBar() {
  const router = useRouter()
  const { query, pathname } = router
  const selectedCategory =
    typeof query.categoria === 'string' ? query.categoria : 'destaques'

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [inited, setInited] = useState(false)

  const updateNavigation = (swiper: SwiperType) => {
    setShowLeft(!swiper.isBeginning)
    setShowRight(!swiper.isEnd)
  }

  const handleCategoryClick = (id: string) => {
    const newQuery = id === 'destaques' ? {} : { ...query, categoria: id }
    router.push({ pathname, query: newQuery }, undefined, { shallow: true })
  }

  return (
    <S.Wrapper>
      <div className="container">
        <S.Container>
          <S.CategoryMenu
            $showLeft={inited && showLeft}
            $showRight={inited && showRight}
          >
            <S.NavPrev
              className="swiper-button-prev"
              style={{ visibility: inited && showLeft ? 'visible' : 'hidden' }}
            />

            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              freeMode
              touchReleaseOnEdges
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
              }}
              onSwiper={(swiper) => {
                updateNavigation(swiper)
                setInited(true)
              }}
              onSlideChange={updateNavigation}
              className="swiper-container"
              style={{ visibility: inited ? 'visible' : 'hidden' }}
            >
              {categories.map(({ id, label, icon: Icon }, idx) => {
                const isFirst = idx === 0
                const isSelected = id === selectedCategory
                return (
                  <SwiperSlide
                    key={id}
                    style={{
                      width: 'auto',
                      marginLeft: isFirst ? 0 : '20px'
                    }}
                    onClick={() => handleCategoryClick(id)}
                  >
                    <S.CategoryItem $selected={isSelected}>
                      <Icon size={24} weight="fill" />
                      <S.Label>{label}</S.Label>
                    </S.CategoryItem>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <S.NavNext
              className="swiper-button-next"
              style={{ visibility: inited && showRight ? 'visible' : 'hidden' }}
            />
          </S.CategoryMenu>
        </S.Container>
      </div>
    </S.Wrapper>
  )
}
