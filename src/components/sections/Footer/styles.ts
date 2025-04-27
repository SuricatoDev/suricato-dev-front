import styled from 'styled-components'

import { device } from '@/styles/breakpoints'

export const Wrapper = styled.footer`
  z-index: 9999;
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.background_standard};
  transition: background-color
    ${(props) => props.theme.common.transition.default};
  flex-wrap: wrap;
  padding: 1rem;
  border-top: 1px solid #dddddd;

  p,
  a {
    font-size: ${(props) => props.theme.common.font.sizes.body.medium};
    color: ${(props) => props.theme.colors.text_foggy};
    font-weight: ${(props) => props.theme.common.font.weight.semibold};
    transition: color ${(props) => props.theme.common.transition.default};
    text-align: center;
    line-height: 1.6;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (${device.md}) {
    position: fixed;
    bottom: 0;
    padding: 0.875rem;

    p,
    a {
      font-size: ${(props) => props.theme.common.font.sizes.body.medium};
      color: ${(props) => props.theme.colors.text_standard};
    }
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

export const PointerDivider = styled.span`
  width: 2px;
  height: 2px;
  background-color: ${(props) => props.theme.colors.text_standard};
  margin: 0 9px;
  border-radius: 999px;
`
