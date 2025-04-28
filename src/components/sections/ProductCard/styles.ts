import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.background_light};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;

  .hide {
    opacity: 0;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
      z-index: 1;
      pointer-events: none;
      opacity: 1;
      transition: opacity ${({ theme }) => theme.common.transition.slow};
    }
  }
`

export const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

export const Name = styled.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Info = styled.p`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  font-size: ${({ theme }) => theme.common.font.sizes.body.xsmall};
  font-weight: inherit;
  color: ${({ theme }) => theme.colors.text_medium};
`

export const InfoWrapper = styled.div`
  display: flex;
  align-items: start;

  > svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.text_medium};
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  flex-grow: 1;
`

export const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-weight: 500;
`

export const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const NavDefault = styled.button`
  @media (${device.md}) {
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: ${({ theme }) => theme.colors.base_light};
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    user-select: none;
    transition: transform ${({ theme }) => theme.common.transition.fast};
    border: 0.5px solid rgb(0 0 0 / 0.3);

    &::after {
      font-size: 1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text_standard};
    }

    &:hover {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
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

interface FavoriteButtonProps {
  $favorited: boolean
}

export const FavoriteButton = styled.button<FavoriteButtonProps>`
  all: unset;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  cursor: pointer;

  svg {
    transition: all 0.2s ease;
    color: ${({ $favorited, theme }) =>
      $favorited ? theme.colors.primary_dark : '#fff'};

    > path:first-of-type {
      opacity: ${({ $favorited }) => ($favorited ? 1 : 0.5)};
      fill: ${({ $favorited }) => ($favorited ? 'currentColor' : '#000')};
    }

    > path:nth-of-type(2) {
      fill: #fff;
    }
  }
`
