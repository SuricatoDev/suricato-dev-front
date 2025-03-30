import { device } from '@/styles/breakpoints'
import styled from 'styled-components'

export const TabsWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 2rem;
`

export const TabsList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  margin: 0;
`

interface TabItemProps {
  $active: boolean
  disabled?: boolean
}

export const TabItem = styled.li<TabItemProps>`
  position: relative;
  font-weight: ${({ $active }) => ($active ? '900' : '600')};
  flex: 1;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  padding-bottom: 0.5rem;
  color: ${({ $active, disabled, theme }) =>
    disabled
      ? theme.colors.base_dark32
      : $active
        ? theme.colors.primary_medium
        : theme.colors.text_foggy};

  user-select: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    border-radius: 2px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary_medium};
    transform: translateY(50%) scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  @media (${device.md}) {
    &:hover {
      color: ${({ disabled, theme }) =>
        disabled ? theme.colors.base_dark32 : theme.colors.primary_light};
    }
  }
`
