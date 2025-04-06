import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: visible;
  max-width: 630px;
  margin: 0 auto;
`

export const SearchWrapper = styled.div`
  position: absolute;
  top: 32px;
  width: calc(100% - 3rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`

export const MapWrapper = styled.div<{ borderRadius?: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => (borderRadius ? '12px' : '0')};
  filter: brightness(0.9);
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  @media (${device.md}) {
    border-radius: 16px;
    max-height: calc(100dvh - 292px - 2rem);
  }
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:read-only {
    background-color: #f9f9f9;
  }
`

export const Select = styled.select`
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
`

export const MapCaption = styled.p`
  font-size: 0.95rem;
  color: #444;
  text-align: center;
  margin-top: 0.75rem;
`

export const Heading = styled.div<{ withoutPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ withoutPadding }) =>
    withoutPadding ? '0' : ' 0 1.5rem 1rem '};
  gap: 8px;

  @media (${device.md}) {
    padding: 1rem 0;
  }
`

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text_foggy};
`

export const StepPanel = styled.div<{ visible: boolean }>`
  display: ${(p) => (p.visible ? 'block' : 'none')};
`
export const MapContainer = styled.div`
  position: relative;
  height: 100%;
`

export const ConfirmPanel = styled.div`
  margin-top: 16px;
  min-height: 280px;
  overflow: hidden;
`

export const ContainerSubStep2 = styled.div`
  padding: 0 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
