import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

interface CategoryItemProps {
  $selected: boolean
}

interface CategoryMenuProps {
  $showLeft: boolean
  $showRight: boolean
}

export const Wrapper = styled.div`
  position: sticky;
  top: 90px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background_light};
  padding: 0;
  z-index: 100;

  @media (${device.md}) {
    padding: 0.75rem 0 0;
    ${({ theme }) =>
      theme.title === 'dark'
        ? 'box-shadow: 0 -1px 0px rgba(255, 255, 255, 0.2)'
        : 'box-shadow: 0 -1px 0px rgba(0, 0, 0, 0.1)'}
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CategoryMenu = styled.div<CategoryMenuProps>`
  position: relative;
  overflow: hidden;
  min-width: 100%;

  .swiper,
  .swiper-wrapper {
    min-width: 100%;
  }

  .swiper-wrapper {
    justify-content: space-between;
  }

  .swiper-slide:not(:first-child) {
    margin-left: 24px;

    @media (${device.md}) {
      margin-left: 48px;
    }
  }

  .swiper-container {
    padding: 0 1rem;
  }

  .hide {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4rem;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.background_standard},
      transparent
    );
    z-index: 5;
    display: ${({ $showLeft }) => ($showLeft ? 'block' : 'none')};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 3rem;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.colors.background_standard},
      transparent
    );
    z-index: 5;
    display: ${({ $showRight }) => ($showRight ? 'block' : 'none')};
  }
`
export const CategoryItem = styled.div<CategoryItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.text_standard : theme.colors.base_dark56};
  transition: all ${({ theme }) => theme.common.transition.fast};

  @media ${device.md} {
    &:hover {
      color: ${({ theme }) => theme.colors.base_dark88};

      &::after {
        background: ${({ theme }) => theme.colors.base_dark88};
      }
    }
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ $selected, theme }) =>
      $selected ? theme.colors.text_standard : 'transparent'};
    margin-top: 0.5rem;
    transition: background-color 0.3s ease;

    @media (${device.md}) {
      margin-top: 0.75rem;
    }
  }
`

export const Label = styled.span`
  font-size: 0.875rem;
  margin-top: 0.25rem;
  white-space: nowrap;
  text-align: center;
`

export const NavDefault = styled.button`
  @media (${device.md}) {
    margin: 0;
    position: absolute;
    top: unset;
    bottom: 0;
    transform: translateY(calc(-50% - 0.25rem));
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

    @media ${device.md} {
      &:hover {
        transform: translateY(calc(-50% - 0.25rem)) scale(1.04);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
  display: none;
`

export const NavPrev = styled(NavDefault)`
  left: 2px;

  &:disabled {
    display: none;
  }
`

export const NavNext = styled(NavDefault)`
  right: 2px;
  &:disabled {
    display: none;
  }
`
