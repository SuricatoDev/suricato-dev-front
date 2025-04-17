import React, { useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ArrowsLeftRight } from '@phosphor-icons/react/dist/ssr/ArrowsLeftRight'
import { CalendarDots } from '@phosphor-icons/react/dist/ssr/CalendarDots'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { MoneyWavy } from '@phosphor-icons/react/dist/ssr/MoneyWavy'

import Skeleton from '@/components/common/Skeleton'

import * as S from './styles'

export type ProductCardProps = {
  images: string[]
  name: string
  origin: string
  destination: string
  date: string
  price: number
  priority?: boolean
  isLoading?: boolean
  href: string
}

export default function ProductCard({
  images,
  name,
  origin,
  destination,
  date,
  price,
  priority,
  isLoading = false,
  href
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
    <Link href={href} passHref>
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
                  alt=""
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
        </S.ImageContainer>

        <S.Content>
          <S.TopContent>
            <S.Name>{name}</S.Name>
          </S.TopContent>

          <S.BottomContent>
            <S.Info>
              <MapPin size={14} weight="fill" />
              {origin}
              <ArrowsLeftRight
                style={{ transform: 'scaleX(-1)' }}
                size={14}
                weight="bold"
              />
              {destination}
            </S.Info>
            <S.Info>
              <CalendarDots size={14} weight="fill" />
              {date}
            </S.Info>
            <S.Info>
              <MoneyWavy size={14} weight="fill" />
              {price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </S.Info>
          </S.BottomContent>
        </S.Content>
      </S.Wrapper>
    </Link>
  )
}
