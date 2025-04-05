import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import * as S from '@/styles/pages/anunciar/steps/step8'
import { CreateAdContext, ImageItem } from '@/contexts/CreateAdContext'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import useMediaQuery from '@/hooks/useMediaQuery'
import { Camera } from '@phosphor-icons/react/dist/ssr/Camera'
import { DotsThree } from '@phosphor-icons/react/dist/ssr/DotsThree'
import { CameraPlus } from '@phosphor-icons/react/dist/ssr/CameraPlus'
import { motion } from 'framer-motion'

interface SortableImageProps {
  item: ImageItem
  index: number
  isMobile: boolean
  onMenu: () => void
  activeId: string | null
  url: string
  showMenu: boolean
  isCover: boolean
}

const SortableImage = ({
  item,
  index,
  isMobile,
  onMenu,
  activeId,
  url,
  showMenu,
  isCover
}: SortableImageProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    borderColor: isDragging ? '#888' : 'transparent'
  }

  const isActive = activeId === item.id

  return (
    <S.ImageWrapper
      ref={setNodeRef}
      style={!isMobile ? style : undefined}
      isCover={isCover}
      {...(!isMobile ? { ...attributes, ...listeners } : {})}
    >
      {!isActive && url && (
        <Image
          src={url}
          alt={`Foto ${index + 1}`}
          fill
          unoptimized
          style={{ objectFit: 'contain' }}
        />
      )}
      {isMobile && showMenu && (
        <S.MenuButton onClick={onMenu}>
          <DotsThree weight="bold" size={24} />
        </S.MenuButton>
      )}
      <Camera size={32} />
    </S.ImageWrapper>
  )
}

export default function Step8({
  setCanProceed
}: {
  setCanProceed: (ok: boolean) => void
}) {
  const { formData, updateFormData } = useContext(CreateAdContext)!
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [imageUrls, setImageUrls] = useState<{ [id: string]: string }>({})
  const isMobile = useMediaQuery()
  const sensors = useSensors(useSensor(PointerSensor))
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)

  console.log(formData.imagens)

  const handleDragEnter = () => setIsDraggingFile(true)
  const handleDragLeave = () => setIsDraggingFile(false)

  const activeImage =
    formData.imagens.find((img) => img.id === activeId) || null

  useEffect(() => {
    setCanProceed(formData.imagens.length > 0)
  }, [formData.imagens])

  useEffect(() => {
    const urls: { [id: string]: string } = {}
    formData.imagens.forEach((img) => {
      urls[img.id] = URL.createObjectURL(img.file)
    })
    setImageUrls(urls)

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [formData.imagens])

  const updateImageOrders = (images: ImageItem[]): ImageItem[] => {
    return images.map((image, index) => ({
      ...image,
      order: index
    }))
  }

  const reorder = (from: number, to: number) => {
    let reordered = arrayMove(formData.imagens, from, to)
    reordered = updateImageOrders(reordered)
    updateFormData('imagens', reordered)
    setOpenMenuId(null)
  }

  const deleteImage = (index: number) => {
    const updated = [...formData.imagens]
    updated.splice(index, 1)
    updateFormData('imagens', updated)
    setOpenMenuId(null)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null)
    if (!over || active.id === over.id) return

    const oldIndex = formData.imagens.findIndex((i) => i.id === active.id)
    const newIndex = formData.imagens.findIndex((i) => i.id === over.id)
    reorder(oldIndex, newIndex)
  }

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newImage = {
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        order: formData.imagens.length
      }
      updateFormData('imagens', [...formData.imagens, newImage])
    }
  }

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const newImage = {
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        order: formData.imagens.length
      }
      updateFormData('imagens', [...formData.imagens, newImage])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const renderImages = () => (
    <S.Container>
      <S.Heading
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <S.Title>Organize as fotos do seu anúncio</S.Title>
        <S.Description>
          Você pode arrastar as imagens para reordenar, escolher a foto de capa
          e excluir as que quiser.
        </S.Description>
      </S.Heading>
      <S.Grid
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {formData.imagens.map((img, idx) => (
          <div
            key={img.id}
            style={{
              position: 'relative'
            }}
          >
            <SortableImage
              item={img}
              index={idx}
              isCover={idx === 0}
              isMobile={isMobile}
              activeId={activeId}
              onMenu={() =>
                setOpenMenuId(openMenuId === img.id ? null : img.id)
              }
              url={imageUrls[img.id]}
              showMenu={true}
            />
            {idx === 0 && <S.CoverTag>Foto de capa</S.CoverTag>}
            {isMobile && openMenuId === img.id && (
              <S.MenuList>
                {idx > 0 && (
                  <S.MenuItem onClick={() => reorder(idx, idx - 1)}>
                    Mover para trás
                  </S.MenuItem>
                )}
                {idx < formData.imagens.length - 1 && (
                  <S.MenuItem onClick={() => reorder(idx, idx + 1)}>
                    Mover para frente
                  </S.MenuItem>
                )}
                {idx !== 0 && (
                  <S.MenuItem onClick={() => reorder(idx, 0)}>
                    Usar como foto de capa
                  </S.MenuItem>
                )}
                <S.MenuItem onClick={() => deleteImage(idx)}>
                  Excluir
                </S.MenuItem>
              </S.MenuList>
            )}
          </div>
        ))}

        <S.ImageWrapper
          style={{
            border: '2px dashed',
            borderColor: isDraggingFile ? '#FF6D3C' : '#ccc',
            background: isDraggingFile ? '#FF6D3C10' : 'transparent',
            cursor: 'pointer'
          }}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDropFile}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <CameraPlus
            color={isDraggingFile ? '#FF6D3C' : 'currentColor'}
            size={32}
          />
        </S.ImageWrapper>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleAddImage}
        />
      </S.Grid>
    </S.Container>
  )

  return isMobile ? (
    renderImages()
  ) : (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={formData.imagens} strategy={rectSortingStrategy}>
        {renderImages()}
      </SortableContext>

      <DragOverlay>
        {activeImage && imageUrls[activeImage.id] ? (
          <S.OverlayImage>
            <Image
              src={imageUrls[activeImage.id]}
              alt="Preview"
              fill
              unoptimized
              style={{ objectFit: 'contain' }}
            />
          </S.OverlayImage>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
