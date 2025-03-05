// components/ProductCard.tsx
import React, { useRef, useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { Heart } from '@phosphor-icons/react/dist/ssr/Heart'
import { CalendarDots } from '@phosphor-icons/react/dist/ssr/CalendarDots'
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'

import Skeleton from '@/components/common/Skeleton'

import * as S from './styles'

export type ProductCardProps = {
  images: string[]
  location: string
  distance: string
  date: string
  hour: string
  priority?: boolean
  isLoading?: boolean
}

export default function ProductCard({
  images,
  location,
  distance,
  date,
  hour,
  priority,
  isLoading = false
}: ProductCardProps) {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateNavigation = (swiper: SwiperType) => {
    setShowLeft(!swiper.isBeginning)
    setShowRight(!swiper.isEnd)
  }

  if (isLoading) {
    return (
      <S.Wrapper>
        <S.ImageContainer>
          <Skeleton radius="0" height="100%" />
        </S.ImageContainer>
        <S.Content>
          <S.TopContent>
            <Skeleton height="1rem" />
            <S.Info as="div">
              <Skeleton height="0.965rem" />
            </S.Info>
          </S.TopContent>

          <S.BottomContent>
            <S.Info as="div">
              <Skeleton height="0.965rem" width="40%" />
            </S.Info>

            <S.Info as="div">
              <Skeleton height="0.965rem" width="30%" />
            </S.Info>
          </S.BottomContent>
        </S.Content>
      </S.Wrapper>
    )
  }

  return (
    <S.Wrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <S.ImageContainer>
        <S.NavPrev
          ref={prevRef}
          className={`swiper-button-prev product-card-swiper-button-prev ${showLeft && isHovered ? '' : 'hide'}`}
        />
        <S.NavNext
          ref={nextRef}
          className={`swiper-button-next product-card-swiper-button-next ${showRight && isHovered ? '' : 'hide'}`}
        />

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          pagination={{ clickable: true }}
          onSwiper={updateNavigation}
          onSlideChange={updateNavigation}
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <Image
                src={imageUrl}
                alt={`${location} - image ${index + 1}`}
                fill
                style={{
                  objectFit: 'cover'
                }}
                priority={index === 0 && priority ? true : undefined}
                fetchPriority={index === 0 && priority ? 'high' : 'low'}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <S.FavoriteButton>
          <Heart size={24} weight="duotone" />
        </S.FavoriteButton>
      </S.ImageContainer>

      <S.Content>
        <S.TopContent>
          <S.Location>{location}</S.Location>
          <S.Info>
            <MapPin size={14} weight="fill" />
            {distance}
          </S.Info>
        </S.TopContent>

        <S.BottomContent>
          <S.Info>
            <CalendarDots size={14} weight="fill" />
            {date}
          </S.Info>

          <S.Info>
            <Clock size={14} weight="fill" />
            {hour}
          </S.Info>
        </S.BottomContent>
      </S.Content>
    </S.Wrapper>
  )
}
