import { device } from '@/styles/breakpoints'
import styled, { css } from 'styled-components'

export interface ScrolledProps {
  $isScrolled: boolean
}

export const Wrapper = styled.header<ScrolledProps>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  background-color: ${(props) => props.theme.colors.background_standard};
  transition: background-color
    ${(props) => props.theme.common.transition.default};
  box-shadow: rgb(0 0 0 / 16%) 0 0 6px;

  @media (${device.md}) {
    box-shadow: ${({ $isScrolled }) =>
      $isScrolled ? 'rgb(0 0 0 / 16%) 0 0 6px' : 'none'};
  }
`

export const Container = styled.div`
  max-width: 1440px;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

export const TopHeader = styled.div`
  @media (${device.md}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 66px;
    font-weight: ${(props) => props.theme.common.font.weight.semibold};
    transition: all ${(props) => props.theme.common.transition.default};
  }
  display: none;
`

export const Menu = styled.nav<ScrolledProps>`
  display: flex;
  gap: 24px;
  opacity: ${({ $isScrolled }) => ($isScrolled ? '0' : '1')};
  pointer-events: ${({ $isScrolled }) => ($isScrolled ? 'none' : 'auto')};
  transition: opacity ${(props) => props.theme.common.transition.default};

  a {
    color: ${({ theme }) => theme.colors.text_standard};
  }
`

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.colors.text_medium};
  }
`

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.base_dark16};
  border-radius: 99px;
  background-color: ${({ theme }) => theme.colors.background_standard};
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  transition: box-shadow ${(props) => props.theme.common.transition.default};

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`

export const Hamburguer = styled.div<{ $isProfileOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: relative;
  user-select: none;
  background: none;
  border: none;
  cursor: pointer;

  span {
    display: block;
    width: 23px;
    height: 3px;
    position: relative;
    background-color: ${({ theme }) => theme.colors.text_medium};
    border-radius: 8px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition:
      transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1),
      background-color 0.3s,
      opacity 0.3s;
  }

  span:nth-child(1) {
    transform-origin: 0% 0%;
  }

  span:nth-child(2) {
    transform-origin: 0% 100%;
  }

  ${({ $isProfileOpen }) =>
    $isProfileOpen &&
    css`
      span {
        background-color: ${({ theme }) => theme.colors.primary_medium};
      }
      span:nth-child(1) {
        transform: rotate(45deg) translate(0.5px, -3.25px);
      }
      span:nth-child(2) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      span:nth-child(3) {
        opacity: 1;
        transform: rotate(-45deg) translate(-0.5px, -1px);
      }
    `}
`

export const MenuItem = styled.span<{ $isBold?: boolean }>`
  font-weight: ${({ $isBold }) => ($isBold ? '600' : 'normal')};
  display: block;
  text-align: start;
  border: none;
  background-color: ${({ theme }) => theme.colors.background_standard};
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text_medium};
  cursor: pointer;
  transition: background-color
    ${(props) => props.theme.common.transition.default};

  &:hover {
    background-color: #f7f7f7;
  }
`

export const ProfileMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: max-content;
  background-color: ${({ theme }) => theme.colors.background_standard};
  border: 1px solid ${({ theme }) => theme.colors.base_dark16};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  z-index: 999;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

export const SearchWrapper = styled.div<ScrolledProps>`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (${device.md}) {
    transition: margin-top ${(props) => props.theme.common.transition.default};
    margin-top: ${({ $isScrolled }) =>
      $isScrolled ? 'calc(-1rem - 66px + 8px)' : '0px'};
  }
`

export const Search = styled.div<ScrolledProps>`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.background_standard};
  padding: 0 0.5rem;
  border-radius: 99px;
  height: 50px;
  max-width: 720px;
  box-shadow:
    0 3px 12px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid ${(props) => props.theme.colors.base_dark16};
  transition:
    height ${(props) => props.theme.common.transition.default},
    padding ${(props) => props.theme.common.transition.default},
    margin-top ${(props) => props.theme.common.transition.default};

  input {
    text-align: center;
  }

  @media (${device.md}) {
    width: ${({ $isScrolled }) => ($isScrolled ? '480px' : '60vw')};
    height: ${({ $isScrolled }) => ($isScrolled ? '50px' : '66px')};
    transform: ${({ $isScrolled }) =>
      $isScrolled ? 'scale(0.9)' : 'scale(1)'};
    transition:
      transform ${(props) => props.theme.common.transition.default},
      width ${(props) => props.theme.common.transition.default};

    input {
      text-align: left;
    }
  }
`

export const SearchInput = styled.input`
  background: none;
  border: none;
  padding: 0 0.5rem;
  font-size: 1.15rem;
  flex: 1 1 0%;
  color: var(--dark);
  outline: none;
`

export const SearchButton = styled.button<ScrolledProps>`
  @media (${device.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ $isScrolled }) => ($isScrolled ? '0' : '0 1rem')};
    background-color: ${(props) => props.theme.colors.primary_medium};
    gap: ${({ $isScrolled }) => ($isScrolled ? '0' : '0.5rem')};
    color: ${(props) => props.theme.colors.base_light};
    border: none;
    height: calc(100% - 1rem);
    min-width: 2rem;
    border-radius: 99px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    overflow: hidden;

    transition:
      background-color ${(props) => props.theme.common.transition.default},
      padding ${(props) => props.theme.common.transition.default},
      gap ${(props) => props.theme.common.transition.default};

    &:hover {
      background-color: ${(props) => props.theme.colors.primary_light};
    }

    span {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      max-width: ${({ $isScrolled }) => ($isScrolled ? '0px' : '150px')};
      transform: ${({ $isScrolled }) =>
        $isScrolled ? 'scaleX(0.5)' : 'scaleX(1)'};
      opacity: ${({ $isScrolled }) => ($isScrolled ? '0' : '1')};
      transition:
        max-width ${(props) => props.theme.common.transition.default},
        transform ${(props) => props.theme.common.transition.default},
        opacity ${(props) => props.theme.common.transition.default};
    }
  }

  display: none;
`
