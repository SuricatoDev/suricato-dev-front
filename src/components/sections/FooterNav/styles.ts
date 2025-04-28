import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`

export const FooterNavContainer = styled.div`
  background: ${({ theme }) => theme.colors.background_light};
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
`

export const Back = styled.button<{ hide: boolean }>`
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
  margin-left: -10px;
  margin-right: -10px;
  padding: 10px;
  font-size: ${({ theme }) => theme.common.font.sizes.body.large};
  color: ${({ theme }) => theme.colors.text_standard};
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;

  @media (${device.md}) {
    &:hover {
      color: ${({ theme }) => theme.colors.text_medium};
      background-color: ${({ theme }) => theme.colors.background_standard};
    }
  }
`

export const ProgressBarContainer = styled.div`
  position: relative;
  background-color: rgb(221, 221, 221);
  height: 6px;
  overflow: hidden;
`

export const ProgressBarFill = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${({ theme }) => theme.colors.primary_medium};
  transition: width 0.3s ease-in-out;
`

export const DividerLine = styled.div<{ left: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
  width: 6px;
  height: 100%;
  background-color: #fff;
`
