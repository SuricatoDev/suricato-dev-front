import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Shadow = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

export const Container = styled.div<{
  withPagination?: boolean
  showGradient?: boolean
}>`
  position: relative;
  background: ${({ theme }) => theme.colors.background_standard};
  border-radius: 8px;
  width: calc(100% - 2rem);
  max-width: 600px;
  max-height: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid
    ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.base_dark32 : 'transparent'};

  &::after {
    content: '';
    opacity: ${({ showGradient }) => (showGradient ? '1' : '0')};
    position: absolute;
    left: 0;
    right: 0;
    bottom: ${({ withPagination }) => (withPagination ? '72px' : '0')};
    height: 3rem;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      ${({ theme }) => theme.colors.background_standard} 100%
    );
    transition: opacity ${({ theme }) => theme.common.transition.default};
  }
`

export const Header = styled.div`
  position: sticky;
  top: 0;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.base_dark32};
  background-color: ${(props) => props.theme.colors.background_standard};
  z-index: 9;
  border-radius: 8px 8px 0 0;
`

export const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1em;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text_medium};
`

export const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => props.theme.common.font.sizes.heading.xxxsmall};
  color: ${(props) => props.theme.colors.text_standard};
  padding: 0 1.5rem;
`
export const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Body = styled.div<{ withPagination?: boolean }>`
  position: relative;
  flex: 1;
  overflow-y: auto;
  padding: ${({ withPagination }) =>
    withPagination ? '1.5rem 1.5rem 0' : '1.5rem'};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding-bottom: 1.5rem;
`

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text_medium};
`

export const PerPageSelect = styled.select`
  margin-left: auto;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.text_foggy};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.background_standard};
`

export const PageButton = styled.button<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary_medium : theme.colors.base_dark16};
  color: ${({ active, theme }) => (active ? '#fff' : theme.colors.text_foggy)};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Ellipsis = styled.span`
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.colors.text_foggy};
`

export const PagesWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const ArrowButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  padding: 0 4px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary_medium};
  ${({ disabled }) =>
    disabled && `opacity: 0.5; cursor: not-allowed; filter: grayscale(1);`}
  cursor: ${({ disabled }) => (disabled ? 'now-allowed' : 'pointer')};
  transition: background-color ${({ theme }) => theme.common.transition.default};

  @media ${device.md} {
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }
  }
`

export const Footer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  .next,
  .last {
    margin-left: 0.5rem;
  }

  .prev,
  .first {
    margin-right: 0.5rem;
  }
`
export const SortContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding-bottom: 0.5rem;
`

export const SortButton = styled.button<{ active?: boolean }>`
  display: flex;
  gap: 0.25rem;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary_medium : 'transparent'};
  color: ${({ active, theme }) => (active ? '#fff' : theme.colors.text_medium)};
  border: 2px solid ${({ theme }) => theme.colors.primary_medium};
  border-radius: 16px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-weight: 500;

  transition:
    background-color ${({ theme }) => theme.common.transition.default},
    color ${({ theme }) => theme.common.transition.default};
`

export const SearchContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background_standard};
  z-index: 1;
`
