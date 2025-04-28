import React, { useCallback, useEffect, useRef, useState } from 'react'

import Cam3dIcon from '@/assets/icons/cam-3d.png'
import { useDropzone } from 'react-dropzone'

import { Plus } from '@phosphor-icons/react/dist/ssr/Plus'
import { X } from '@phosphor-icons/react/dist/ssr/X'

import { ImageItem } from '@/contexts/CreateAdContext'

import Button from '../Button'
import * as S from './styles'

type ImageDropzoneProps = {
  onFilesChange?: (items: ImageItem[]) => void
  initialFiles?: ImageItem[]
}

export function ImageDropzone({
  onFilesChange,
  initialFiles = []
}: ImageDropzoneProps) {
  const [images, setImages] = useState<ImageItem[]>(initialFiles)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputKey, setInputKey] = useState(0)

  useEffect(() => {
    setImages(initialFiles)
  }, [initialFiles])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const startIndex = images.length
      const newItems = acceptedFiles.map((file, i) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        order: startIndex + i
      }))
      const updated = [...images, ...newItems]
      setImages(updated)
      onFilesChange?.(updated)
      setInputKey((k) => k + 1)
    },
    [images, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  })

  const removeImage = (idx: number) => {
    const updated = images.filter((_, i) => i !== idx)
    setImages(updated)
    onFilesChange?.(updated)
    setInputKey((k) => k + 1)
  }

  return (
    <S.DropzoneContainer
      {...getRootProps()}
      isDragActive={isDragActive}
      onClick={(e) => {
        if (images.length > 0) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        inputRef.current?.click()
      }}
      style={{ cursor: images.length > 0 ? 'auto' : 'pointer' }}
    >
      <input {...getInputProps()} key={inputKey} ref={inputRef} />
      {images.length === 0 ? (
        <S.LogoContainer>
          <S.Icon
            src={Cam3dIcon.src}
            alt="Camera Icon"
            width={120}
            height={120}
          />
          <Button size="sm" variant="outlined" type="button">
            Adicionar fotos
          </Button>
        </S.LogoContainer>
      ) : (
        <S.AddMoreButton
          onClick={(e) => {
            e.stopPropagation()
            inputRef.current?.click()
          }}
        >
          <Plus weight="bold" size={20} color="#fff" />
        </S.AddMoreButton>
      )}

      {images.length > 0 && (
        <S.PreviewsGrid onClick={(e) => e.stopPropagation()}>
          {images.map((img, index) => (
            <S.PreviewWrapper key={img.id}>
              <S.PreviewImage src={img.previewUrl} alt={`preview-${index}`} />
              <S.RemoveButton
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(index)
                }}
              >
                <X weight="bold" size={20} color="#fff" />
              </S.RemoveButton>
            </S.PreviewWrapper>
          ))}
        </S.PreviewsGrid>
      )}
    </S.DropzoneContainer>
  )
}
