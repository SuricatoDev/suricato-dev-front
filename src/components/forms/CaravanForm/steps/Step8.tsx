import React, { useEffect, useRef, useState } from 'react'

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { CameraPlus } from '@phosphor-icons/react/dist/ssr/CameraPlus'
import { DotsThree } from '@phosphor-icons/react/dist/ssr/DotsThree'

import useMediaQuery from '@/hooks/useMediaQuery'

import { ImageItem, useCreateAd } from '@/contexts/CreateAdContext'

import * as S from '@/styles/pages/anuncios/steps/step8'

const MotionHeading = motion(S.Heading)
const MotionGrid = motion(S.Grid)

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

function SortableImage({
  item,
  index,
  isMobile,
  onMenu,
  activeId,
  url,
  showMenu,
  isCover
}: SortableImageProps) {
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
    </S.ImageWrapper>
  )
}

export default function Step8({
  setCanProceed
}: {
  setCanProceed: (ok: boolean) => void
}) {
  const { formData, updateFormData } = useCreateAd()
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({})
  const isMobile = useMediaQuery()
  const sensors = useSensors(useSensor(PointerSensor))
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)

  useEffect(() => {
    setCanProceed(formData.imagens.length >= 5)
  }, [formData.imagens, setCanProceed])

  useEffect(() => {
    const urls: Record<string, string> = {}
    const toRevoke: string[] = []
    formData.imagens.forEach((img) => {
      if (img.file) {
        const blobUrl = URL.createObjectURL(img.file)
        urls[img.id] = blobUrl
        toRevoke.push(blobUrl)
      } else {
        urls[img.id] = img.previewUrl
      }
    })
    setImageUrls(urls)
    return () => toRevoke.forEach(URL.revokeObjectURL)
  }, [formData.imagens])

  const updateImageOrders = (imgs: ImageItem[]) =>
    imgs.map((image, idx) => ({ ...image, order: idx }))

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
    if (!file) return
    const newItem: ImageItem = {
      id: crypto.randomUUID(),
      file,
      previewUrl: '',
      order: formData.imagens.length
    }
    updateFormData('imagens', [...formData.imagens, newItem])
  }

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file?.type.startsWith('image/')) {
      const newItem: ImageItem = {
        id: crypto.randomUUID(),
        file,
        previewUrl: '',
        order: formData.imagens.length
      }
      updateFormData('imagens', [...formData.imagens, newItem])
    }
  }

  const handleDragEnter = () => setIsDraggingFile(true)
  const handleDragLeave = () => setIsDraggingFile(false)
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const renderGrid = () => (
    <S.Container>
      <MotionHeading
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <S.Title>Organize as fotos do seu anúncio</S.Title>
        <S.Description>
          Arraste para reordenar, escolha a capa ou exclua imagens.
        </S.Description>
      </MotionHeading>

      <MotionGrid
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {formData.imagens.map((img, idx) => (
          <div key={img.id} style={{ position: 'relative' }}>
            <SortableImage
              item={img}
              index={idx}
              isMobile={isMobile}
              activeId={activeId}
              onMenu={() =>
                setOpenMenuId(openMenuId === img.id ? null : img.id)
              }
              url={imageUrls[img.id]}
              showMenu
              isCover={idx === 0}
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
      </MotionGrid>
    </S.Container>
  )

  return isMobile ? (
    renderGrid()
  ) : (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={formData.imagens.map((img) => img.id)}
        strategy={rectSortingStrategy}
      >
        {renderGrid()}
      </SortableContext>

      <DragOverlay>
        {activeId && imageUrls[activeId] && (
          <S.OverlayImage>
            <Image
              src={imageUrls[activeId]}
              alt="Preview"
              fill
              unoptimized
              style={{ objectFit: 'contain' }}
            />
          </S.OverlayImage>
        )}
      </DragOverlay>
    </DndContext>
  )
}
