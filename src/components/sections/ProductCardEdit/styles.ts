import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background_light};
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`

export const CardHeader = styled.div`
  position: relative;
`

export const CardImage = styled.div<{ bg: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`

export const CardCategory = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: ${({ theme }) => theme.colors.primary_medium};
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  z-index: 1;
  font-weight: 900;
`

export const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  z-index: 0;
`

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text_standard};
  margin-bottom: 0.25rem;
`

export const CardSubInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wreap;
  gap: 0.5rem;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  color: ${({ theme }) => theme.colors.text_medium};
`

export const SubInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text_medium};

  svg {
    fill: ${({ theme }) => theme.colors.text_medium};
  }
`

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  justify-content: flex-end;
  flex-direction: column;
`

export const MenuWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  z-index: 2;
`

export const MenuToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text_standard};
  background-color: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  transition: background-color ${({ theme }) => theme.common.transition.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background_light};
  }
`

export const MenuList = styled.ul`
  position: absolute;
  top: 110%;
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
  &:hover {
    background: ${({ theme }) => theme.colors.background_light};
  }
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.common.font.sizes.body.medium};
  color: ${({ theme }) => theme.colors.text_medium};
  padding-bottom: 0.75rem;

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

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
      background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
      z-index: 1;
      pointer-events: none;
      opacity: 1;
      transition: opacity ${({ theme }) => theme.common.transition.slow};
    }
  }
`

export const NavDefault = styled.button`
  @media (${device.md}) {
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: ${({ theme }) => theme.colors.background_light};
    border: ${({ theme }) => theme.colors.base_dark32};
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
  z-index: 2;
`

export const NavNext = styled(NavDefault)`
  transition: opacity ${({ theme }) => theme.common.transition.default};
  right: 0.5rem;
  z-index: 2;
`
