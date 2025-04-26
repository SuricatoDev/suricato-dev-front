import styled from 'styled-components'

import Button from '@/components/common/Button'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
`

export const Content = styled.div`
  width: 100%;
  padding: 0 1rem 1rem;
`

export const Title = styled.h2`
  font-size: 1rem;
  text-align: center;
`

export const Body = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`

export const Description = styled.p`
  margin-bottom: 12px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text_medium};
`

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const Item = styled.li`
  display: grid;
  grid-template-columns: 8px 1fr auto auto auto;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
`

export const Dot = styled.span<{ status: string }>`
  min-width: 8px;
  min-height: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ status, theme }) =>
    status === 'approved'
      ? theme.colors.alert_success
      : theme.colors.alert_warning};
`

export const Name = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
`

export const Seats = styled.span`
  color: ${({ theme }) => theme.colors.text_foggy};
`

export const DateTxt = styled.span`
  color: ${({ theme }) => theme.colors.text_foggy};
  font-size: 0.75rem;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.text_foggy};
`

const ArrowButton = styled(Button)<{ disabled?: boolean }>`
  min-width: 32px;
  padding: 4px;
  margin: 0 4px;
  ${({ disabled }) => disabled && `opacity: 0.5; cursor: not-allowed;`}
`

export const FirstArrow = styled(ArrowButton)``
export const PrevArrow = styled(ArrowButton)``

export const PagesWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 4px;
`

export const PageButton = styled(ArrowButton)<{ active?: boolean }>`
  background: ${({ active, theme }) =>
    active ? theme.colors.primary_medium : 'transparent'};
  color: ${({ active, theme }) => (active ? '#fff' : theme.colors.text_medium)};
`

export const Ellipsis = styled.span`
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.text_medium};
`

export const NextArrow = styled(ArrowButton)``
export const LastArrow = styled(ArrowButton)``
