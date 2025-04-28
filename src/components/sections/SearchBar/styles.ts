import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div<{ $isScrolled?: boolean }>`
  display: none;

  @media ${device.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.text_foggy};
    border-radius: 999px;
    padding: 8px;
    gap: 4px;
    position: relative;
    max-width: 700px;
    margin-inline: auto;
    transition: all 0.3s ease;
    background-color: ${({ theme }) => theme.colors.background_light};

    ${({ $isScrolled }) =>
      $isScrolled &&
      css`
        max-width: 600px;
      `};
  }
`
export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.text_ultrafoggy};
`

export const Segment = styled.div<{ $active?: boolean; $isScrolled?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.base_dark16 : 'transparent'};
  border-radius: 999px;
  flex: 1;
  text-align: left;
  position: relative;
  transition: all 0.2s;

  @media ${device.md} {
    &:hover {
      background: ${({ theme }) => theme.colors.base_dark16};
    }
  }

  small {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text_standard};
    font-weight: 500;
    display: ${({ $isScrolled }) => ($isScrolled ? 'none' : 'block')};
  }

  input {
    font-size: ${({ $isScrolled }) => ($isScrolled ? '0.85rem' : '0.9rem')};
    color: ${({ theme }) => theme.colors.text_standard};
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary_medium};
  border: none;
  border-radius: 999px;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  gap: 0.5rem;

  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;

  transition: background-color ${({ theme }) => theme.common.transition.default};

  @media ${device.md} {
    &:hover {
      background: ${({ theme }) => theme.colors.primary_light};
    }
  }
`
export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: ${({ theme }) => theme.colors.background_standard};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: max-content;
  max-width: 360px;
  padding: 0.5rem 0;
  z-index: 999;
`

export const Suggestion = styled.li`
  list-style: none;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text_medium};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.base_dark16};
  }

  strong {
    font-weight: 500;
    font-size: 0.875rem;
  }

  @media ${device.md} {
    &:hover {
      background: ${({ theme }) => theme.colors.background_light};
    }
  }
`
export const MobileTrigger = styled.div`
  min-height: 43px;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.base_dark32};
  border-radius: 999px;
  width: 100%;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_medium};
  background: ${({ theme }) => theme.colors.background_standard};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;

  strong {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text_standard};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text_medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  @media ${device.md} {
    display: none;
  }
`

export const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background_light};
  z-index: 999;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;

  @media (min-width: 768px) {
    display: none;
  }
`

export const HeaderMobile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  p {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text_standard};
  }
`

export const MobileCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  background: none;
  border: none;
  color: #222;
  cursor: pointer;
  z-index: 1000;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.base_dark32};
  color: ${({ theme }) => theme.colors.text_standard};
  padding: 0.5rem;
`

export const MobileBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background_standard};
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 4%),
    0 6px 20px rgb(0 0 0 / 20%);
`

export const MobileBlock = styled.div`
  background: none;
  border-radius: 12px;
  border: none;
  text-align: left;
  width: 100%;
`

export const MobileBlockTitle = styled.strong<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${({ active }) => (active ? '1.625rem' : '0.875rem')};
  color: ${({ theme, active }) =>
    active ? theme.colors.text_standard : theme.colors.text_foggy};
  font-weight: 600;

  strong {
    color: ${({ theme }) => theme.colors.text_standard};
    font-weight: 500;
  }
`

export const MobileSuggestionsTitle = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text_standard};
  font-weight: bold;
  text-align: left;
  padding: 0.5rem 0;
`

export const MobileInput = styled.input`
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.background_standard};
  color: ${({ theme }) => theme.colors.text_standard};
`

export const FooterBar = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ClearButton = styled.button`
  font-size: 1rem;
  font-weight: 500;
  text-decoration: underline;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const MobileFilterSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: 8px;

  @media ${device.md} {
    display: none;
  }
`

export const MobileIconButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_medium};

  @media ${device.md} {
    display: none;
  }
`

export const MobileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  gap: 0.5rem;
  @media ${device.md} {
    display: none;
  }
`
