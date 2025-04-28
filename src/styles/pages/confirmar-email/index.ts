import styled from 'styled-components'

export const Container = styled.div`
  max-width: 600px;
  width: calc(100% - 1.5rem);
  max-height: calc(100% - 1.5rem);
  background-color: ${({ theme }) => theme.colors.background_light};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow-y: auto;
`

export const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.primary_medium};
  padding: 20px;
  text-align: center;
`

export const Logo = styled.img`
  max-width: 180px;
`

export const Content = styled.div`
  padding: 30px;
  text-align: center;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary_medium};
`

export const Text = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text_standard};
  margin-bottom: 1.5rem;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

export const ErrorText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.alert_error};
`

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.colors.background_light};
  padding: 15px;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text_foggy};
  position: fixed;
  bottom: 0;
  width: 100%;
`
