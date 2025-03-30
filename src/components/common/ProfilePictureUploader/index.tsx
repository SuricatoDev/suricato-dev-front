import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'

import * as S from './styles'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import { Minus } from '@phosphor-icons/react/dist/ssr/Minus'
import { Plus } from '@phosphor-icons/react/dist/ssr/Plus'

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<File> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Não foi possível obter o contexto do canvas')

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        return reject(new Error('Canvas está vazio'))
      }

      const file = new File([blob], 'foto_perfil.jpeg', { type: 'image/jpeg' })
      resolve(file)
    }, 'image/jpeg')
  })
}

export type ChangeProfilePicModalProps = {
  $isOpen: boolean
  imageSrc: string | null
  isLoading?: boolean
  onClose: () => void
  onSave: (croppedImage: File, isTemporary: boolean) => void
}

export default function ChangeProfilePicModal({
  $isOpen,
  imageSrc,
  onClose,
  onSave,
  isLoading = false
}: ChangeProfilePicModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea)
  }, [])

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels)
    onSave(croppedImg, false)
  }

  const minZoom = 1
  const maxZoom = 3
  const percent = ((zoom - minZoom) / (maxZoom - minZoom)) * 100

  return (
    <Modal
      closeButton={false}
      $withMaxSizes={false}
      $isOpen={$isOpen}
      onClose={onClose}
    >
      <S.Container>
        <S.Header>
          <h2>Escolher foto do perfil</h2>
        </S.Header>
        <S.Body>
          {imageSrc ? (
            <>
              <S.CropperWrapper>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </S.CropperWrapper>
              <S.Controls>
                <S.ControlButton
                  onClick={() =>
                    setZoom((prev) => Math.max(minZoom, prev - 0.1))
                  }
                >
                  <Minus size={20} />
                </S.ControlButton>

                <S.RangeInput
                  id="zoomRange"
                  min={minZoom}
                  max={maxZoom}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  $progress={`${percent}%`}
                />

                <S.ControlButton
                  onClick={() =>
                    setZoom((prev) => Math.min(maxZoom, prev + 0.1))
                  }
                >
                  <Plus size={20} />
                </S.ControlButton>
              </S.Controls>
            </>
          ) : (
            <p>Nenhuma imagem selecionada</p>
          )}
        </S.Body>
        <S.Footer>
          <Button
            disabled={isLoading}
            fullWidth
            variant="outlined"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            disabled={isLoading}
            loading={isLoading}
            fullWidth
            onClick={handleSave}
          >
            Salvar
          </Button>
        </S.Footer>
      </S.Container>
    </Modal>
  )
}
