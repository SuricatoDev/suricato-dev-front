import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import * as S from './styles'
import { Heart, Star } from '@phosphor-icons/react'

type ProductCardProps = {
  images: string[]
  location: string
  distance: string
  dateRange: string
  price: number
  rating: number
}

export default function ProductCard({
  images,
  location,
  distance,
  dateRange,
  price,
  rating
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
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <S.FavoriteButton>
          <Heart size={24} weight="duotone" />
        </S.FavoriteButton>
      </S.ImageContainer>

      <S.Content>
        <S.TopInfo>
          <S.Location>{location}</S.Location>
          <S.Rating>
            <span>{rating.toFixed(2)}</span>
            <Star size={16} weight="fill" />
          </S.Rating>
        </S.TopInfo>

        <S.Distance>{distance}</S.Distance>
        <S.DateRange>{dateRange}</S.DateRange>

        <S.Price>
          R${price} <span>/ noite</span>
        </S.Price>
      </S.Content>
    </S.Wrapper>
  )
}
