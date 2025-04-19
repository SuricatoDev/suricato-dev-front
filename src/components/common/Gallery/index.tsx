import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import 'react-image-gallery/styles/css/image-gallery.css'

import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import { X } from '@phosphor-icons/react/dist/ssr/X'

import Skeleton from '../Skeleton'
import * as S from './styles'

const Portal = dynamic(() => import('../Portal'), { ssr: false })

const ImageGallery = dynamic(() => import('react-image-gallery'), {
  ssr: false
})

interface GalleryProps {
  images: string[]
}

export default function Gallery({ images }: GalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [loadingImages, setLoadingImages] = useState(() =>
    images.map(() => true)
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 960)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!images || images.length === 0) return null

  const galleryItems = images.map((img) => ({
    original: img,
    thumbnail: img
  }))

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false)

  const handleImageLoad = (idx: number) => () => {
    setLoadingImages((prev) => {
      const next = [...prev]
      next[idx] = false
      return next
    })
  }

  const mainImage = images[0]
  const extraImages = images.slice(1, 5)
  const remainingCount = images.length - 5

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={mainImage} />
      </Head>
      <S.GalleryWrapper $count={images.length}>
        <S.MobileGallery>
          <ImageGallery
            items={galleryItems}
            showIndex
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            infinite={false}
            showNav={false}
            onClick={() => openModal(currentIndex)}
            lazyLoad
            onSlide={(index) => setCurrentIndex(index)}
            renderItem={(item) => {
              const idx = galleryItems.findIndex(
                (i) => i.original === item.original
              )
              return (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9'
                  }}
                >
                  {loadingImages[idx] && (
                    <div style={{ position: 'absolute', inset: 0 }}>
                      <Skeleton
                        rows={1}
                        columns={1}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}
                  <Image
                    src={item.original}
                    alt={`Imagem ${idx}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={90}
                    onLoad={handleImageLoad(idx)}
                    priority={idx === 0}
                  />
                </div>
              )
            }}
          />
        </S.MobileGallery>

        <S.GridItem
          onClick={() => openModal(0)}
          $variant="main"
          $onlyItem={images.length === 1}
          className="desktop-images"
          style={{ position: 'relative', height: '100%' }}
        >
          {loadingImages[0] && (
            <div style={{ position: 'absolute', inset: 0 }}>
              <Skeleton
                rows={1}
                columns={1}
                width="100%"
                height="100%"
                gap="8px"
                radius="4px"
              />
            </div>
          )}
          <Image
            src={mainImage}
            alt="Imagem principal"
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
            priority
            onLoad={handleImageLoad(0)}
          />
        </S.GridItem>
        {extraImages.map((img, idx) => {
          const actualIndex = idx + 1
          return (
            <S.GridItem
              key={img}
              onClick={() => openModal(actualIndex)}
              style={{ position: 'relative' }}
            >
              {loadingImages[actualIndex] && (
                <div style={{ position: 'absolute', inset: 0 }}>
                  <Skeleton
                    rows={1}
                    columns={1}
                    width="100%"
                    height="100%"
                    gap="8px"
                    radius="4px"
                  />
                </div>
              )}
              <Image
                src={img}
                alt={`Imagem ${actualIndex}`}
                fill
                style={{ objectFit: 'cover' }}
                quality={80}
                onLoad={handleImageLoad(actualIndex)}
              />
              {idx === extraImages.length - 1 && remainingCount > 0 && (
                <S.Overlay>+{remainingCount}</S.Overlay>
              )}
            </S.GridItem>
          )
        })}
      </S.GalleryWrapper>

      {isModalOpen && (
        <Portal>
          <S.FullscreenModalOverlay onClick={closeModal}>
            <S.FullscreenModalContent onClick={(e) => e.stopPropagation()}>
              {!isMobile && (
                <S.CloseButton onClick={closeModal}>
                  <X size={32} weight="bold" />
                </S.CloseButton>
              )}
              <S.GalleryCarouselWrapper>
                <ImageGallery
                  additionalClass="gallery-carousel"
                  items={galleryItems}
                  startIndex={currentIndex}
                  showThumbnails={false}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={!isMobile}
                  infinite={false}
                  showIndex={false}
                  renderLeftNav={(onClick, disabled) => (
                    <S.NavPrev onClick={onClick} disabled={disabled}>
                      <CaretLeft size={38} weight="bold" />
                    </S.NavPrev>
                  )}
                  renderRightNav={(onClick, disabled) => (
                    <S.NavNext onClick={onClick} disabled={disabled}>
                      <CaretRight size={38} weight="bold" />
                    </S.NavNext>
                  )}
                />
              </S.GalleryCarouselWrapper>
            </S.FullscreenModalContent>
          </S.FullscreenModalOverlay>
        </Portal>
      )}
    </>
  )
}
