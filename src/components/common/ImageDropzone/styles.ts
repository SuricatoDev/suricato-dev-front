import Image from 'next/image'
import styled from 'styled-components'

export const DropzoneContainer = styled.div<{ isDragActive: boolean }>`
  position: relative;
  border: 2px dashed #ddd;
  border-radius: 8px;
  text-align: center;
  transition: border-color 0.3s ease;
  width: 100%;
  aspect-ratio: 1/1;

  ${({ isDragActive }) =>
    isDragActive &&
    `
    border-color: #999;
  `}
`

export const PreviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  padding: 10px;
  width: 100%;
`

export const PreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  cursor: auto;
`

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
`
export const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.alert_error};
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled(Image)`
  filter: drop-shadow(0px 16px 4px rgba(0, 0, 0, 0.25));
`

export const AddMoreButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: ${({ theme }) => theme.colors.primary_medium};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  height: 100%;
`
