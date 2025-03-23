import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { X } from '@phosphor-icons/react/dist/ssr/X'
import * as S from './styles'
import Cam3dIcon from '@/assets/icons/cam-3d.png'
import { Plus } from '@phosphor-icons/react/dist/ssr'

type ImageDropzoneProps = {
  onFilesChange?: (files: File[]) => void
}

export function ImageDropzone({ onFilesChange }: ImageDropzoneProps) {
  const [images, setImages] = useState<File[]>([])
  // Usamos uma key para reinicializar o input
  const [inputKey, setInputKey] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = [...images, ...acceptedFiles]
      setImages(newImages)
      if (onFilesChange) {
        onFilesChange(newImages)
      }
      // Atualiza a key para forçar a remontagem do input
      setInputKey((prev) => prev + 1)
    },
    [images, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  })

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
    if (onFilesChange) {
      onFilesChange(updatedImages)
    }
    // Também atualiza a key ao remover, para garantir que o input seja reinicializado
    setInputKey((prev) => prev + 1)
  }

  return (
    <S.DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} key={inputKey} ref={inputRef} />
      {images.length === 0 ? (
        <S.LogoContainer>
          <S.Icon
            src={Cam3dIcon.src}
            alt="Camera Icon"
            width={120}
            height={120}
          />
          <S.UploadButton
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            Adicionar fotos
          </S.UploadButton>
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
        <S.PreviewsGrid>
          {images.map((file, index) => {
            const previewUrl = URL.createObjectURL(file)
            return (
              <S.PreviewWrapper key={index}>
                <S.PreviewImage src={previewUrl} alt={`preview-${index}`} />
                <S.RemoveButton
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                >
                  <X weight="bold" size={20} color="#fff" />
                </S.RemoveButton>
              </S.PreviewWrapper>
            )
          })}
        </S.PreviewsGrid>
      )}
    </S.DropzoneContainer>
  )
}
