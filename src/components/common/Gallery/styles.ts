import styled, { css } from 'styled-components'

import { device } from '@/styles/breakpoints'

const layoutForCount = (count: number) => {
  switch (count) {
    case 1:
      return `
        grid-template-columns: 1fr ;
        grid-template-rows: 1fr;
        grid-template-areas:
          "main";
      `
    case 2:
      return `
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-template-areas:
          "main second";
      `
    case 3:
      return `
        grid-template-columns: 2fr 2fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          "main second second"
          "main third third";
      `
    case 4:
      return `
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          "main second third"
          "main fourth fourth";
      `
    case 5:
      return `
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          "main second third"
          "main fourth fifth";
      `
    default:
      return `
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          "main second third"
          "main fourth fifth";
      `
  }
}

export const GalleryWrapper = styled.div<{ $count: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  .desktop-images {
    display: none;

    @media (${device.md}) {
      display: block;
    }
  }

  .image-gallery-image {
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  @media (${device.md}) {
    aspect-ratio: unset;
    display: grid;
    gap: 1rem;
    ${({ $count }) => layoutForCount($count <= 5 ? $count : 6)}

    & > :nth-child(2) {
      grid-area: main;
    }
    & > :nth-child(3) {
      grid-area: second;
      aspect-ratio: ${({ $count }) =>
        $count === 4 || $count >= 5 ? '1' : $count === 3 ? '2.07' : 'unset'};
    }
    & > :nth-child(4) {
      grid-area: third;
      aspect-ratio: ${({ $count }) =>
        $count === 4 || $count >= 5 ? '1' : $count === 3 ? '2.07' : 'unset'};
    }
    & > :nth-child(5) {
      grid-area: fourth;
      aspect-ratio: ${({ $count }) =>
        $count === 5
          ? '1'
          : $count === 4 || $count === 3
            ? '2.07'
            : $count >= 5
              ? '1'
              : 'unset'};
    }
    & > :nth-child(6) {
      grid-area: fifth;
      aspect-ratio: ${({ $count }) => ($count >= 5 ? '1' : 'unset')};
    }
  }
`

export const MobileGallery = styled.div`
  aspect-ratio: 16 / 9;

  @media ${device.md} {
    display: none;
  }
`

interface GridItemProps {
  $variant?: 'main'
  $onlyItem?: boolean
}

export const GridItem = styled.div<GridItemProps>`
  display: none;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 16 / 9;

  @media ${device.md} {
    display: flex;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color
      ${({ theme }) => theme.common.transition.default};
  }
  &:hover::after {
    background: rgba(0, 0, 0, 0.35);
  }

  @media (${device.md}) {
    aspect-ratio: unset;
  }

  ${({ $variant, $onlyItem }) =>
    $variant === 'main' &&
    css`
      @media (${device.md}) {
        aspect-ratio: ${$onlyItem ? '16 / 9' : '1'};
      }
    `}
`

export const DesktopImages = styled.div`
  display: none;

  @media (${device.md}) {
    display: block;
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 8px;
`

export const FullscreenHeader = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 16px;
  z-index: 1100;
`

export const FullscreenThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
`

export const FullscreenSmallImage = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
`

const NavDefault = styled.button`
  @media (${device.md}) {
    margin: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0.5rem;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    user-select: none;

    svg {
      color: ${({ theme }) => theme.colors.base_dark8};
      transition:
        transform ${({ theme }) => theme.common.transition.fast},
        color ${({ theme }) => theme.common.transition.fast},
        opacity ${({ theme }) => theme.common.transition.fast};

      &:hover {
        color: ${({ theme }) => theme.colors.primary_medium};
        transform: scale(1.1);
      }
    }

    &::after {
      font-size: 1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text_standard};
    }
  }
  display: none;
`

export const NavPrev = styled(NavDefault)`
  transition: opacity ${({ theme }) => theme.common.transition.default};
  left: 0.5rem;
`

export const NavNext = styled(NavDefault)`
  transition: opacity ${({ theme }) => theme.common.transition.default};
  right: 0.5rem;
`

export const GalleryCarouselWrapper = styled.div`
  .image-gallery-icon {
    color: ${({ theme }) => theme.colors.base_dark32};
    transition:
      transform ${({ theme }) => theme.common.transition.fast},
      color ${({ theme }) => theme.common.transition.fast},
      opacity ${({ theme }) => theme.common.transition.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary_medium};
      transform: scale(1.1);
    }
  }

  .image-gallery-bullets .image-gallery-bullet:hover {
    background: ${({ theme }) => theme.colors.primary_light};
    border: 1px solid ${({ theme }) => theme.colors.primary_light};
  }

  .image-gallery-bullets .image-gallery-bullet.active:hover {
    background: ${({ theme }) => theme.colors.primary_medium};
  }
`

export const FullscreenModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
`

export const FullscreenModalContent = styled.div`
  cursor: default;
  position: relative;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FullscreenCloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  z-index: 2100;
  font-size: 32px;
  font-weight: bold;
`

export const CloseButton = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.5rem;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.base_dark8};
  transition:
    transform ${({ theme }) => theme.common.transition.fast},
    color ${({ theme }) => theme.common.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary_medium};
    transform: scale(1.1);
  }
`
