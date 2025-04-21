import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

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
  $disabled?: boolean
}

export const TabItem = styled.li<TabItemProps>`
  position: relative;
  flex: 1;
  text-align: center;
  padding-bottom: 0.5rem;

  font-weight: ${({ $active }) => ($active ? 900 : 600)};
  color: ${({ theme, $active, $disabled }) =>
    $disabled
      ? theme.colors.base_dark32
      : $active
        ? theme.colors.primary_medium
        : theme.colors.text_foggy};

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.primary_medium};
    transform: translateY(60%) scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  @media (${device.md}) {
    &:hover {
      color: ${({ theme, $disabled }) =>
        $disabled ? theme.colors.base_dark32 : theme.colors.primary_light};
    }
  }
`
