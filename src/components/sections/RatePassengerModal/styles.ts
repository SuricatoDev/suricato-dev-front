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

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background_standard};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;

  h3 {
    padding-bottom: 1rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text_standard};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text_medium};
    font-weight: 500;
    line-height: 1.25;
  }

  strong {
    width: 100%;
    display: inline-block;
    padding: 0.5rem 0;
    font-size: ${({ theme }) => theme.common.font.sizes.heading.xxsmall};
  }
`

export const ModalButtons = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  & > button {
    flex: 1 1;
    white-space: nowrap;
  }
`

export const PassengerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4px 0;
`

export const Name = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_standard};
`

export const Stars = styled.div`
  display: flex;
  gap: 4px;
`

export const StarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  color: ${({ theme }) => theme.colors.primary_medium};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`

export const Loader = styled.div`
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  border: 6px solid ${({ theme }) => theme.colors.text_ultrafoggy};
  border-top-color: ${({ theme }) => theme.colors.primary_medium};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const ContainerLoading = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background_standard};
  border-radius: 8px;
  width: calc(100% - 2rem);
  max-height: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
