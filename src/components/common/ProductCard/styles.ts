import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const Wrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const ImageContainer = styled.div`
  --swiper-pagination-color: ${({ theme }) => theme.colors.base_light};
  --swiper-pagination-bullet-inactive-color: ${({ theme }) =>
    theme.colors.base_dark56};
  --swiper-pagination-bullet-inactive-opacity: 0.8;
  --swiper-pagination-bullet-width: 6px;
  --swiper-pagination-bullet-height: 6px;

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
`

export const FavoriteButton = styled.button`
  background-color: transparent;
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  cursor: pointer;
  z-index: 10;

  svg {
    color: ${({ theme }) => theme.colors.base_light};
  }
`

export const Content = styled.div`
  padding: 12px;
`

export const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

export const Location = styled.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text_medium};
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text_medium};
  }

  svg {
    color: ${({ theme }) => theme.colors.text_medium};
  }
`

export const Distance = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const DateRange = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Price = styled.p`
  margin: 8px 0 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text_medium};

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text_standard};
  }
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
