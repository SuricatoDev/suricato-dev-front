import { useState, useEffect } from 'react'
import Image from 'next/image'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import * as S from './styles'
import Portal from '../Portal'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft'
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import { X } from '@phosphor-icons/react/dist/ssr/X'
import Skeleton from '../Skeleton'

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
    const checkMobile = () => setIsMobile(window.innerWidth <= 960)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  const handleImageLoad = (index: number) => () => {
    setLoadingImages((prev) => {
      const newLoading = [...prev]
      newLoading[index] = false
      return newLoading
    })
  }

  const mainImage = images[0]
  const extraImages = images.slice(1, 5)
  const remainingCount = images.length - 5

  return (
    <>
      <S.GalleryWrapper $count={images.length}>
        {isMobile ? (
          <ImageGallery
            items={galleryItems}
            showIndex
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            infinite={false}
            showNav={false}
            onClick={() => openModal(currentIndex)}
          />
        ) : (
          <>
            <S.GridItem
              onClick={() => openModal(0)}
              $variant="main"
              $onlyItem={images.length === 1}
            >
              {loadingImages && (
                <Skeleton
                  rows={1}
                  columns={1}
                  width="100%"
                  height="300px"
                  gap="8px"
                  radius="4px"
                />
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
                <S.GridItem key={img} onClick={() => openModal(actualIndex)}>
                  {loadingImages[actualIndex] && (
                    <Skeleton
                      rows={1}
                      columns={1}
                      width="100%"
                      height="300px"
                      gap="8px"
                      radius="4px"
                    />
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
          </>
        )}
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
