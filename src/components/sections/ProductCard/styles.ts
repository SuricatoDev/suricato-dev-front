import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  border-radius: 8px;
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
  color: ${({ theme }) => theme.colors.text_medium};
`

export const Info = styled.p`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  font-size: ${({ theme }) => theme.common.font.sizes.body.xsmall};
  font-weight: inherit;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
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
  gap: 0.25rem;
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
