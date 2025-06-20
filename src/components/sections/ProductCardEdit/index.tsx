import React, { useRef, useState } from 'react'

import { categories } from '@/constants/categories'
import { Caravan } from '@/interfaces/caravan'
import { format } from 'date-fns'
import Image from 'next/image'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank'
import { DotsThree } from '@phosphor-icons/react/dist/ssr/DotsThree'
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin'
import { MoneyWavy } from '@phosphor-icons/react/dist/ssr/MoneyWavy'
import { Ticket } from '@phosphor-icons/react/dist/ssr/Ticket'

import Button from '@/components/common/Button'
import Skeleton from '@/components/common/Skeleton'

import * as S from './styles'

export interface ProductCardEditProps {
  caravan: Caravan
  activeTab: string
  isOpenMenu: boolean
  isLoading?: boolean
  priority?: boolean
  onToggleMenu: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onViewReservations?: (caravan: Caravan) => void
}

export function ProductCardEdit({
  caravan,
  activeTab,
  isOpenMenu,
  onToggleMenu,
  onEdit,
  onDelete,
  priority,
  isLoading,
  onViewReservations
}: ProductCardEditProps) {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(caravan?.imagens?.length).fill(false)
  )

  const category = categories.find((cat) => cat.id === caravan.categoria)

  const updateNavigation = (swiper: SwiperType) => {
    setShowLeft(!swiper.isBeginning)
    setShowRight(!swiper.isEnd)
  }

  if (isLoading) {
    return (
      <S.Card key={caravan?.id} as="div">
        <S.CardHeader as="div">
          <Skeleton height="200px" radius="0" />
        </S.CardHeader>

        <S.CardBody as="div">
          <S.CardTitle as="div">
            <Skeleton height="24px" />
          </S.CardTitle>
          <S.Description as="div">
            <Skeleton height="34px" />
          </S.Description>
          <S.CardSubInfo as="div">
            <S.SubInfoItem as="div">
              <Skeleton height="17px" width="70%" />
            </S.SubInfoItem>
            <S.SubInfoItem as="div">
              <Skeleton height="17px" width="70%" />
            </S.SubInfoItem>
            <S.SubInfoItem as="div">
              <Skeleton height="17px" width="60%" />
            </S.SubInfoItem>
            <S.SubInfoItem as="div">
              <Skeleton height="17px" width="45%" />
            </S.SubInfoItem>
            <S.SubInfoItem as="div">
              <Skeleton height="17px" width="50%" />
            </S.SubInfoItem>
          </S.CardSubInfo>
        </S.CardBody>
        {activeTab === 'upcoming' && (
          <S.CardFooter as="div">
            <Skeleton height="48px" radius="8px" />
          </S.CardFooter>
        )}
      </S.Card>
    )
  }

  return (
    <S.Card key={caravan.id}>
      <S.CardHeader>
        <S.ImageContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
            {[...caravan.imagens]
              .sort((a, b) => a.ordem - b.ordem)
              .map((image, index) => (
                <SwiperSlide key={`slide-${index}`}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    {!imagesLoaded[index] && (
                      <Skeleton height="100%" width="100%" radius="0" />
                    )}
                    <Image
                      src={image.path.replace(/\/{2,}(?=[^/]*$)/, '/')}
                      alt=""
                      fill
                      sizes="
                        (max-width: 639px) 100vw,
                        (max-width: 1440px) 50vw,
                        33vw
                      "
                      style={{
                        objectFit: 'cover'
                      }}
                      priority={index === 0 && priority ? true : undefined}
                      fetchPriority={index === 0 && priority ? 'high' : 'low'}
                      onLoad={() => {
                        const newImagesLoaded = [...imagesLoaded]
                        newImagesLoaded[index] = true
                        setImagesLoaded(newImagesLoaded)
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </S.ImageContainer>
        <S.CardCategory>{category?.label}</S.CardCategory>
      </S.CardHeader>

      <S.CardBody>
        <S.CardTitle>{caravan.titulo}</S.CardTitle>
        <S.Description>
          <span>
            <b>Descrição:</b> {caravan.descricao}
          </span>
        </S.Description>
        <S.CardSubInfo>
          <S.SubInfoItem>
            <MapPin size={16} weight="bold" /> <b>Origem: </b>
            {caravan.cidade_origem}/{caravan.estado_origem}
          </S.SubInfoItem>
          <S.SubInfoItem>
            <MapPin size={16} weight="fill" /> <b>Destino:</b>
            {caravan.cidade_destino}/{caravan.estado_destino}
          </S.SubInfoItem>
          <S.SubInfoItem>
            <CalendarBlank size={16} weight="bold" /> <b>Data:</b>{' '}
            <span>
              {format(new Date(caravan.data_partida), 'dd/MM/yyyy')} -{' '}
              {format(new Date(caravan.data_retorno), 'dd/MM/yyyy')}
            </span>
          </S.SubInfoItem>
          <S.SubInfoItem>
            <MoneyWavy size={16} fill="bold" /> <b>Preço:</b>{' '}
            {caravan.valor.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </S.SubInfoItem>
          <S.SubInfoItem>
            <Ticket fill="bold" size={16} /> <b>Vagas restantes:</b>
            {caravan?.vagas_disponiveis ?? 0} / {caravan.numero_vagas}
          </S.SubInfoItem>
        </S.CardSubInfo>
      </S.CardBody>

      {activeTab === 'upcoming' ? (
        <>
          <S.MenuWrapper>
            <S.MenuToggle onClick={() => onToggleMenu(caravan.id)}>
              <DotsThree size={20} weight="bold" />
            </S.MenuToggle>
            {isOpenMenu && (
              <S.MenuList>
                <S.MenuItem onClick={() => onEdit(caravan.id)}>
                  Editar
                </S.MenuItem>
                <S.MenuItem onClick={() => onDelete(caravan.id)}>
                  Excluir
                </S.MenuItem>
              </S.MenuList>
            )}
          </S.MenuWrapper>

          <S.CardFooter>
            <Button
              fullWidth
              onClick={() => {
                onViewReservations && onViewReservations(caravan)
              }}
            >
              Ver reservas
            </Button>
          </S.CardFooter>
        </>
      ) : (
        <S.CardFooter>
          <Button
            fullWidth
            onClick={() => {
              onViewReservations && onViewReservations(caravan)
            }}
          >
            Avaliar Passageiros
          </Button>
        </S.CardFooter>
      )}
    </S.Card>
  )
}

export default ProductCardEdit
