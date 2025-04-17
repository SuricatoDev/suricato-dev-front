import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const PromptContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background: ${({ theme }) => theme.colors.background_standard};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  z-index: 999999;
  overflow: hidden;
  font-family: sans-serif;

  @media (${device.md}) {
    max-width: 400px;
    border-radius: 8px 0 0 0;
    left: 100%;
    transform: translateX(-100%);
  }
`

export const Header = styled.div`
  display: flex;
  align-items: start;
  padding: 1rem;
`

export const SiteInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

export const AppIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 12px;
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AppName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_medium};
`

export const AppDomain = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text_light};
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text_light};
  font-size: 42px;
  cursor: pointer;
  display: flex;
`

export const Body = styled.div`
  padding: 1rem;
`

export const InstallButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary_medium};
  color: ${({ theme }) => theme.colors.text_ultralight};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`
