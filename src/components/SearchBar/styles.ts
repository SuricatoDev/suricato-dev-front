import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ $isScrolled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 999px;
  padding: 8px;
  gap: 4px;
  position: relative;
  max-width: 700px;
  margin-inline: auto;
  transition: all 0.3s ease;
  background-color: #ffffff;

  ${({ $isScrolled }) =>
    $isScrolled &&
    css`
      max-width: 600px;
    `};

  @media (max-width: 767px) {
    display: none;
  }
`
export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #ddd;
`

export const Segment = styled.div<{ $active?: boolean; $isScrolled?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  background: ${({ $active }) => ($active ? '#f7f7f7' : 'transparent')};
  border-radius: 999px;
  flex: 1;
  text-align: left;
  position: relative;
  transition: all 0.2s;

  small {
    font-size: 0.75rem;
    color: #${({ theme }) => theme.colors.text_standard};
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
`
export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;

  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: max-content;
  max-width: 360px;
  padding: 0.5rem 1rem;
  z-index: 999;
`

export const Suggestion = styled.li`
  list-style: none;
  padding: 0.75rem 0;
  color: ${({ theme }) => theme.colors.text_medium};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  strong {
    font-weight: 500;
    font-size: 0.875rem;
  }
`
export const MobileTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 999px;
  width: 100%;
  font-weight: 600;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text_medium};
  background-color: #ffffff;

  @media (min-width: 768px) {
    display: none;
  }
`

export const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #f6f6f6;
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
  background-color: #ffffff;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 4%),
    0 6px 20px rgb(0 0 0 / 20%);
`

export const MobileBlock = styled.button`
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
