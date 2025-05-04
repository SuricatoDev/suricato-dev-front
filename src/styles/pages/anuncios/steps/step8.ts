import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;

  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ImageWrapper = styled.div<{ isCover?: boolean }>`
  position: relative;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.background_light};
  outline: 1px solid ${({ theme }) => theme.colors.base_dark32};
  outline-offset: -1px;
  border-radius: 8px;
  overflow: hidden;
  transition:
    border 0.2s ease,
    background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text_foggy};
  aspect-ratio: 1 / 1;

  svg {
    transition: color 0.2s ease;
  }

  img {
    border: 1px solid ${({ theme }) => theme.colors.base_dark32};
    border-radius: 8px;
  }
`

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-clip: padding-box;
  top: 8px;
  right: 8px;
  background: ${({ theme }) => theme.colors.background_standard};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  border: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};
  color: ${({ theme }) => theme.colors.text_standard};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 20px;
  cursor: pointer;
`

export const MenuList = styled.ul`
  position: absolute;
  top: 40px;
  right: 8px;
  background: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid ${({ theme }) => theme.colors.base_dark32};
  border-radius: 6px;
  padding: 4px 0;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
`

export const MenuItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const OverlayImage = styled(ImageWrapper)`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.9;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.background_light};
`
export const CoverTag = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${({ theme }) => theme.colors.background_standard};
  color: ${({ theme }) => theme.colors.text_standard};
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  z-index: 5;
  font-size: 0.875rem;
  font-weight: bold;
  height: 32px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  line-height: 1;
  border: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text_standard};
  font-size: 1.625rem;
  font-weight: 500;

  @media (${device.md}) {
    font-size: 2rem;
  }
`

export const Description = styled.p`
  ${({ theme }) => theme.colors.text_standard};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text_medium};
  line-height: 1.3;
`

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.5rem 1.5rem;
`
